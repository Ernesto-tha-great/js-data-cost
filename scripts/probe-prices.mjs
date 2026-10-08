// One-off probe: what does the published price data look like?
const urls = [
  'https://www.cable.co.uk/mobiles/worldwide-data-pricing/',
];
for (const url of urls) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (js-data-cost research; +https://github.com/Ernesto-tha-great/js-data-cost)' } });
  const html = await res.text();
  console.log('URL', url, res.status, res.headers.get('content-type'), html.length);
  const links = [...html.matchAll(/href="([^"]+\.(?:xlsx|csv|xls)[^"]*)"/gi)].map((m) => m[1]);
  console.log('DATA LINKS', JSON.stringify([...new Set(links)]));
  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((m) => m[0]);
  console.log('TABLES', tables.length);
  tables.forEach((t, i) => {
    const rows = [...t.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) => r[0].replace(/<[^>]+>/g, '|').replace(/\s+/g, ' ').replace(/\|+\s*\|+/g, '|'));
    console.log(`TABLE ${i}: ${rows.length} rows`);
    rows.slice(0, 8).forEach((r) => console.log('  ', r.slice(0, 300)));
    const uk = rows.find((r) => /United Kingdom/.test(r)); if (uk) console.log('  UK ROW', uk.slice(0, 400));
  });
  const idx = html.search(/United Kingdom/);
  console.log('CONTEXT', idx, html.slice(Math.max(0, idx - 600), idx + 600).replace(/\s+/g, ' '));
  const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"/gi)].map((m) => m[1]).filter((s) => /data|chart|table/i.test(s));
  console.log('SCRIPTS', JSON.stringify(scripts.slice(0, 20)));
}
