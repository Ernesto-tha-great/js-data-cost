/**
 * Joins results/measurements.json with data/prices.csv and data/income.csv
 * and writes results/report.md, results/summary.json and the charts in
 * docs/images.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { costUsd, median, monthlyBytes, shareOfMonthlyIncome } from '../src/cost.js';
import type { SiteMeasurement } from '../src/measure.js';

interface Country { iso3: string; name: string }

const measurements = JSON.parse(readFileSync('results/measurements.json', 'utf8')) as {
  measuredAt: string; device: string; browser: string; where: string; sites: SiteMeasurement[];
};
const countries = JSON.parse(readFileSync('countries.json', 'utf8')) as Country[];
const priceMeta = JSON.parse(readFileSync('data/prices.meta.json', 'utf8')) as { edition: string; source: string };
const prices = readCsv('data/prices.csv').map((r) => ({ country: r.country!, usdPerGb: Number(r.usd_per_gb) }));
const income = new Map(readCsv('data/income.csv').map((r) => [r.iso3!, { year: r.year!, gni: Number(r.gni_per_capita_usd) }]));

// The price table and our country list don't always spell names the same way.
const ALIASES: Record<string, string[]> = {
  'United States': ['USA', 'United States of America'],
  'South Korea': ['Korea (South)', 'Korea, Republic of', 'Republic of Korea', 'Korea'],
  Vietnam: ['Viet Nam'],
  Tanzania: ['Tanzania, United Republic of'],
  Turkey: ['Türkiye', 'Turkiye'],
  'United Arab Emirates': ['UAE'],
};
const priceFor = (name: string) => {
  const names = [name, ...(ALIASES[name] ?? [])].map((n) => n.toLowerCase());
  return prices.find((p) => names.includes(p.country.toLowerCase()))?.usdPerGb;
};

// --- Sites ------------------------------------------------------------------
const usable = measurements.sites.filter((s) => !s.blocked && !s.error && s.cold && s.warm && s.cold.bytes > 50_000);
const excluded = measurements.sites.filter((s) => !usable.includes(s));

const sites = usable
  .map((s) => {
    const jsUnused = s.js && s.js.sourceBytes > 0 ? 1 - s.js.usedBytes / s.js.sourceBytes : 0;
    return {
      name: s.name,
      coldBytes: s.cold!.bytes,
      warmBytes: s.warm!.bytes,
      jsBytes: s.js?.transferred ?? 0,
      jsUnused,
      requests: s.cold!.requests,
    };
  })
  .sort((a, b) => b.coldBytes - a.coldBytes);

const medianCold = median(sites.map((s) => s.coldBytes));
const medianWarm = median(sites.map((s) => s.warmBytes));
const totalCold = sites.reduce((sum, s) => sum + s.coldBytes, 0);
const totalJs = sites.reduce((sum, s) => sum + s.jsBytes, 0);
const unusedJsBytes = sites.reduce((sum, s) => sum + s.jsBytes * s.jsUnused, 0);

// --- Countries ----------------------------------------------------------------
const rows = countries
  .map((c) => ({ ...c, usdPerGb: priceFor(c.name), income: income.get(c.iso3) }))
  .filter((c): c is Country & { usdPerGb: number; income: { year: string; gni: number } } => c.usdPerGb !== undefined && c.income !== undefined)
  .map((c) => {
    const firstVisit = costUsd(medianCold, c.usdPerGb);
    const month = costUsd(monthlyBytes(medianCold, medianWarm), c.usdPerGb);
    return { ...c, firstVisit, month, shareOfIncome: shareOfMonthlyIncome(month, c.income.gni) };
  })
  .sort((a, b) => b.shareOfIncome - a.shareOfIncome);
const missingPrices = countries.filter((c) => priceFor(c.name) === undefined).map((c) => c.name);
const missingIncome = countries.filter((c) => !income.has(c.iso3)).map((c) => c.name);

// --- Write ----------------------------------------------------------------------
const mb = (bytes: number) => `${(bytes / 1e6).toFixed(2)} MB`;
const pct = (x: number, digits = 1) => `${(100 * x).toFixed(digits)}%`;
const usd = (x: number) => (x < 0.01 ? `${(x * 100).toFixed(2)}¢` : `$${x.toFixed(2)}`);

const summary = {
  measuredAt: measurements.measuredAt,
  priceEdition: priceMeta.edition,
  sitesMeasured: measurements.sites.length,
  sitesUsable: sites.length,
  excluded: excluded.map((s) => ({ name: s.name, reason: s.error ?? (s.blocked ? `blocked (${s.status}, "${s.title}")` : 'too small to be a real page') })),
  medianColdBytes: medianCold,
  medianWarmBytes: medianWarm,
  heaviest: sites[0],
  lightest: sites.at(-1),
  jsShareOfBytes: totalJs / totalCold,
  unusedJsShareOfBytes: unusedJsBytes / totalCold,
  countries: rows.map((r) => ({ name: r.name, usdPerGb: r.usdPerGb, gni: r.income.gni, gniYear: r.income.year, firstVisit: r.firstVisit, month: r.month, shareOfIncome: r.shareOfIncome })),
  missingPrices,
  missingIncome,
};

mkdirSync('results', { recursive: true });
writeFileSync('results/summary.json', JSON.stringify(summary, null, 2) + '\n');

const md = [
  `# Results`,
  '',
  `Measured ${measurements.measuredAt.slice(0, 10)} from a ${measurements.where}, ${measurements.device}, ${measurements.browser}.`,
  `Prices: Cable.co.uk Worldwide Mobile Data Pricing, ${priceMeta.edition} edition. Income: World Bank GNI per capita (Atlas method), most recent year.`,
  '',
  `${sites.length} of ${measurements.sites.length} sites were usable. Median first visit: **${mb(medianCold)}**. Median repeat visit: **${mb(medianWarm)}**.`,
  `JavaScript was ${pct(totalJs / totalCold)} of all bytes on first visits, and an estimated ${pct(unusedJsBytes / totalCold)} of all bytes were JavaScript that never ran during load.`,
  '',
  '## Sites (first visit, heaviest first)',
  '',
  '| Site | First visit | Repeat visit | JavaScript | JS unused during load | Requests |',
  '|---|---:|---:|---:|---:|---:|',
  ...sites.map((s) => `| ${s.name} | ${mb(s.coldBytes)} | ${mb(s.warmBytes)} | ${mb(s.jsBytes)} | ${pct(s.jsUnused, 0)} | ${s.requests} |`),
  '',
  excluded.length ? `Excluded: ${summary.excluded.map((e) => `${e.name} (${e.reason})`).join('; ')}.` : '',
  '',
  `## Countries: a month of using the median site (${mb(monthlyBytes(medianCold, medianWarm))})`,
  '',
  '| Country | 1 GB costs | First visit | A month of use | Share of monthly income |',
  '|---|---:|---:|---:|---:|',
  ...rows.map((r) => `| ${r.name} | $${r.usdPerGb.toFixed(2)} | ${usd(r.firstVisit)} | ${usd(r.month)} | ${pct(r.shareOfIncome, 3)} |`),
  '',
  missingPrices.length ? `No price data for: ${missingPrices.join(', ')}.` : '',
  missingIncome.length ? `No income data for: ${missingIncome.join(', ')}.` : '',
].join('\n');
writeFileSync('results/report.md', md + '\n');

// --- Charts ---------------------------------------------------------------------
mkdirSync('docs/images', { recursive: true });
writeFileSync('docs/images/site-weights.svg', siteWeightsChart());
writeFileSync('docs/images/affordability.svg', affordabilityChart());
console.log(md);

function readCsv(path: string): Array<Record<string, string>> {
  const [header, ...lines] = readFileSync(path, 'utf8').trim().split('\n');
  const keys = header!.split(',');
  return lines.map((line) => {
    const values = [...line.matchAll(/("([^"]*)"|[^,]*)(,|$)/g)].map((m) => m[2] ?? m[1]!).slice(0, keys.length);
    return Object.fromEntries(keys.map((k, i) => [k, values[i] ?? '']));
  });
}

function style(): string {
  return `<style>
  svg { --surface:#fcfcfb; --ink:#0b0b0b; --ink-2:#52514e; --ink-3:#8a8983; --rule:#e4e3de; --js:#2a78d6; --other:#c9c8c2; --bar:#eb6834; }
  @media (prefers-color-scheme: dark) { svg { --surface:#1a1a19; --ink:#ffffff; --ink-2:#c3c2b7; --ink-3:#8f8e86; --rule:#383835; --js:#3987e5; --other:#4a4a46; --bar:#d95926; } }
  text { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: var(--ink); }
  .h1 { font-size: 22px; font-weight: 700; } .sub { font-size: 14px; fill: var(--ink-2); }
  .lbl { font-size: 12.5px; fill: var(--ink-2); } .val { font-size: 12px; font-weight: 600; } .note { font-size: 12px; fill: var(--ink-3); }
</style>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function siteWeightsChart(): string {
  const rowH = 22;
  const top = 116;
  const half = Math.ceil(sites.length / 2);
  const height = top + half * rowH + 50;
  const max = sites[0]!.coldBytes;
  const barMax = 300;
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${height}" width="1200" height="${height}" role="img" aria-labelledby="t d">
<title id="t">First-visit download size of ${sites.length} popular sites on a phone</title>
<desc id="d">Median ${mb(medianCold)}. Heaviest: ${esc(sites[0]!.name)} at ${mb(sites[0]!.coldBytes)}. JavaScript is shown separately from everything else.</desc>
${style()}
<rect width="100%" height="100%" fill="var(--surface)"/>
<text class="h1" x="40" y="44">What a first visit downloads</text>
<text class="sub" x="40" y="68">Bytes over the network for one page load on an emulated phone, empty cache, no scrolling. Median: ${mb(medianCold)}.</text>
<rect x="40" y="82" width="14" height="14" rx="3" fill="var(--js)"/><text class="lbl" x="60" y="94">JavaScript</text>
<rect x="150" y="82" width="14" height="14" rx="3" fill="var(--other)"/><text class="lbl" x="170" y="94">Everything else</text>`];
  sites.forEach((s, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const x0 = 40 + col * 580;
    const y = top + row * rowH;
    const jsW = (s.jsBytes / max) * barMax;
    const otherW = ((s.coldBytes - s.jsBytes) / max) * barMax;
    parts.push(`<text class="lbl" x="${x0}" y="${y + 14}">${esc(s.name)}</text>`);
    parts.push(`<rect x="${x0 + 150}" y="${y + 3}" width="${Math.max(1, jsW).toFixed(1)}" height="14" fill="var(--js)"/>`);
    parts.push(`<rect x="${(x0 + 150 + jsW + 1).toFixed(1)}" y="${y + 3}" width="${Math.max(0, otherW - 1).toFixed(1)}" height="14" fill="var(--other)"/>`);
    parts.push(`<text class="val" x="${(x0 + 150 + jsW + otherW + 8).toFixed(1)}" y="${y + 14}">${mb(s.coldBytes)}</text>`);
  });
  parts.push(`<text class="note" x="40" y="${height - 18}">Measured ${measurements.measuredAt.slice(0, 10)} from ${esc(measurements.where)}. Source: npm run measure.</text>`, '</svg>');
  return parts.join('\n') + '\n';
}

function affordabilityChart(): string {
  const rowH = 22;
  const top = 110;
  const half = Math.ceil(rows.length / 2);
  const height = top + half * rowH + 50;
  const max = rows[0]!.shareOfIncome;
  const barMax = 260;
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${height}" width="1200" height="${height}" role="img" aria-labelledby="t d">
<title id="t">Share of a month's income spent on data to use the median site for a month</title>
<desc id="d">${rows.slice(0, 5).map((r) => `${esc(r.name)} ${pct(r.shareOfIncome, 2)}`).join('; ')}, down to ${esc(rows.at(-1)!.name)} ${pct(rows.at(-1)!.shareOfIncome, 3)}.</desc>
${style()}
<rect width="100%" height="100%" fill="var(--surface)"/>
<text class="h1" x="40" y="44">The same website, a very different bill</text>
<text class="sub" x="40" y="68">Data cost of using the median site for a month (5 visits a day), as a share of average monthly income (GNI per capita ÷ 12).</text>`];
  rows.forEach((r, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const x0 = 40 + col * 580;
    const y = top + row * rowH;
    const w = Math.max(1, (r.shareOfIncome / max) * barMax);
    parts.push(`<text class="lbl" x="${x0}" y="${y + 14}">${esc(r.name)}</text>`);
    parts.push(`<rect x="${x0 + 170}" y="${y + 3}" width="${w.toFixed(1)}" height="14" rx="3" fill="var(--bar)"/>`);
    parts.push(`<text class="val" x="${(x0 + 170 + w + 8).toFixed(1)}" y="${y + 14}">${pct(r.shareOfIncome, 3)}</text>`);
  });
  parts.push(`<text class="note" x="40" y="${height - 18}">Prices: Cable.co.uk Worldwide Mobile Data Pricing (${priceMeta.edition}). Income: World Bank, GNI per capita, Atlas method. Source: npm run report.</text>`, '</svg>');
  return parts.join('\n') + '\n';
}
