export function canUseSectionTransitions({ width, height, headerHeight = 80, coarsePointer = false, reducedMotion = false }) {
  return !reducedMotion && !coarsePointer && width >= 1024 && height - headerHeight >= 680;
}

export function getRoomPairHeight({ viewportHeight, headerHeight, copyHeights, gap = 26, outerPadding = 36, rowPadding = 20 }) {
  const available = Math.max(0, viewportHeight - headerHeight - 40);
  const required = copyHeights.reduce((sum, height) => sum + Math.max(150, height + rowPadding), 0) + gap + outerPadding;
  return { height: Math.ceil(Math.max(available, required)), fitsViewport: required <= available };
}
