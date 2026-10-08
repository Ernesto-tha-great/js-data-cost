import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { costUsd, monthlyBytes, shareOfMonthlyIncome, BYTES_PER_GB, VISITS_PER_MONTH } from '../src/cost.js';
import { executedBytes } from '../src/coverage.js';

describe('executedBytes', () => {
  it('lets an inner range that never ran override the outer range that did', () => {
    const source = 'x'.repeat(100);
    const result = executedBytes({
      url: 'app.js',
      source,
      functions: [
        { ranges: [{ startOffset: 0, endOffset: 100, count: 1 }] }, // the script itself ran
        { ranges: [{ startOffset: 20, endOffset: 60, count: 0 }] }, // a function that never did
        { ranges: [{ startOffset: 70, endOffset: 90, count: 3 }, { startOffset: 75, endOffset: 80, count: 0 }] }, // a branch never taken
      ],
    });
    assert.deepEqual(result, { total: 100, used: 100 - 40 - 5 });
  });

  it('treats a script with no source as empty', () => {
    assert.deepEqual(executedBytes({ url: 'x.js', functions: [] }), { total: 0, used: 0 });
  });
});

describe('cost', () => {
  it('prices bytes in binary gigabytes', () => {
    assert.equal(costUsd(BYTES_PER_GB, 2.5), 2.5);
    assert.equal(costUsd(BYTES_PER_GB / 4, 2), 0.5);
  });

  it('models a month as one cold visit and the rest warm', () => {
    assert.equal(monthlyBytes(1000, 10), 1000 + (VISITS_PER_MONTH - 1) * 10);
  });

  it('expresses cost against a month of average income', () => {
    assert.equal(shareOfMonthlyIncome(10, 12_000), 0.01);
  });
});
