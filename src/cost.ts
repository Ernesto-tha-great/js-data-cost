/** Carriers sell data in binary gigabytes (1 GB = 1024 MB), so we price it the same way. */
export const BYTES_PER_GB = 2 ** 30;

/**
 * "Using a site" for a month: five visits a day for 30 days. The first visit
 * has an empty cache; the other 149 get whatever the cache saved.
 */
export const VISITS_PER_MONTH = 150;

export function costUsd(bytes: number, usdPerGb: number): number {
  return (bytes / BYTES_PER_GB) * usdPerGb;
}

export function monthlyBytes(coldBytes: number, warmBytes: number): number {
  return coldBytes + (VISITS_PER_MONTH - 1) * warmBytes;
}

/** What share of an average month's income (GNI per capita / 12) the data costs. */
export function shareOfMonthlyIncome(usd: number, gniPerCapitaUsd: number): number {
  return usd / (gniPerCapitaUsd / 12);
}

export function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}
