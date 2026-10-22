export function canUseSectionTransitions({ width, height, headerHeight = 80, coarsePointer = false, reducedMotion = false }) {
  return !reducedMotion && !coarsePointer && width >= 1024 && height - headerHeight >= 680;
}

