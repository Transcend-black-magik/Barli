import test from 'node:test';
import assert from 'node:assert/strict';
import { canUseSectionTransitions } from '../scrollPolicy.js';

test('small phone viewports never use forced section transitions', () => {
  for (const height of [520, 640, 700, 780, 844]) {
    assert.equal(canUseSectionTransitions({ width: 360, height, headerHeight: 70, coarsePointer: true }), false);
  }
});

test('short desktop, touch, zoomed, and reduced-motion layouts remain freely scrollable', () => {
  const desktop = { width: 1366, height: 900, headerHeight: 80 };
  assert.equal(canUseSectionTransitions(desktop), true);
  assert.equal(canUseSectionTransitions({ ...desktop, height: 700 }), false);
  assert.equal(canUseSectionTransitions({ ...desktop, coarsePointer: true }), false);
  assert.equal(canUseSectionTransitions({ ...desktop, width: 800 }), false);
  assert.equal(canUseSectionTransitions({ ...desktop, reducedMotion: true }), false);
});

