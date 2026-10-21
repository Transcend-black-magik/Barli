import test from 'node:test';
import assert from 'node:assert/strict';
import { canUseSectionTransitions, getRoomPairHeight } from '../scrollPolicy.js';

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

test('rooms 02 and 03 share the available phone viewport when their text fits', () => {
  const result = getRoomPairHeight({ viewportHeight: 740, headerHeight: 70, copyHeights: [190, 195] });
  assert.equal(result.fitsViewport, true);
  assert.equal(result.height, 630);
});

test('short screens and enlarged text grow the pair instead of cutting off copy', () => {
  const result = getRoomPairHeight({ viewportHeight: 520, headerHeight: 70, copyHeights: [300, 320] });
  assert.equal(result.fitsViewport, false);
  assert.ok(result.height >= 300 + 320 + 40 + 26 + 36);
});

test('fractional viewport heights do not under-allocate the room group', () => {
  const result = getRoomPairHeight({ viewportHeight: 739.5, headerHeight: 70, copyHeights: [250.3, 251.7] });
  assert.equal(result.height, 630);
});
