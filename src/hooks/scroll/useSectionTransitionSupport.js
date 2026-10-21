import React from 'react';
import { canUseSectionTransitions } from '../../utils/scroll/scrollPolicy.js';

export default function useSectionTransitionSupport() {
  const read = () => canUseSectionTransitions({
    width: window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
    headerHeight: document.querySelector('.shared-header')?.offsetHeight || 80,
    coarsePointer: window.matchMedia('(any-pointer: coarse)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
  const [supported, setSupported] = React.useState(read);
  React.useEffect(() => {
    const update = () => setSupported(read());
    const pointer = window.matchMedia('(any-pointer: coarse)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    pointer.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
      pointer.removeEventListener('change', update);
      motion.removeEventListener('change', update);
    };
  }, []);
  return supported;
}
