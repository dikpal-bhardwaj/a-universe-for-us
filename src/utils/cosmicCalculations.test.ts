import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateChapterFromProgress,
  calculateStarPairSeparation,
  calculateConstellationOpacity,
  calculateAnniversaryYears,
} from './cosmicCalculations';

test('calculateChapterFromProgress maps scroll ranges correctly', () => {
  assert.equal(calculateChapterFromProgress(0.0), 1);
  assert.equal(calculateChapterFromProgress(0.10), 1);
  assert.equal(calculateChapterFromProgress(0.18), 2);
  assert.equal(calculateChapterFromProgress(0.30), 3);
  assert.equal(calculateChapterFromProgress(0.45), 4);
  assert.equal(calculateChapterFromProgress(0.60), 5);
  assert.equal(calculateChapterFromProgress(0.70), 6);
  assert.equal(calculateChapterFromProgress(0.80), 7);
  assert.equal(calculateChapterFromProgress(0.90), 8);
  assert.equal(calculateChapterFromProgress(0.98), 9);
  assert.equal(calculateChapterFromProgress(1.0), 9);
});

test('calculateStarPairSeparation converges as progress approaches 0.32', () => {
  const atStart = calculateStarPairSeparation(0.0);
  const atMid = calculateStarPairSeparation(0.16);
  const atProposal = calculateStarPairSeparation(0.32);

  assert.equal(atStart, 16.3);
  assert.ok(atMid < atStart);
  assert.equal(atProposal, 0.3);
});

test('calculateConstellationOpacity activates after chapter 5', () => {
  assert.equal(calculateConstellationOpacity(0.4), 0);
  assert.equal(calculateConstellationOpacity(0.57), 0);
  assert.ok(calculateConstellationOpacity(0.68) > 0);
  assert.ok(calculateConstellationOpacity(0.9) <= 0.9);
});

test('calculateAnniversaryYears computes exactly 2 years for Nov 2024 to Nov 2026', () => {
  assert.equal(calculateAnniversaryYears('2024-11-04', '2026-11-04'), 2);
});
