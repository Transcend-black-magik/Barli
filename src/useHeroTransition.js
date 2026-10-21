import React from 'react';

// One deliberate scroll carries the hero into the next section.
export default function useHeroTransition() {
  React.useEffect(() => {
    const media = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let moving = false;
    let lastGesture = 0;
    let amount = 0;
    const cancel = () => { cancelAnimationFrame(frame); moving = false; amount = 0; };
    const onWheel = event => {
      if (!media.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || document.querySelector('dialog[open], .stay-nav.is-open')) return;
      if (event.target.closest('input, select, textarea, dialog')) return;
      if (moving) { event.preventDefault(); return; }
      const stack = document.querySelector('.hotel-stack');
      if (!stack) return;
      const header = document.querySelector('.shared-header').offsetHeight;
      const destination = stack.getBoundingClientRect().top + window.scrollY - header;
      const current = window.scrollY;
      const forward = event.deltaY > 0 && current < destination - 4;
      const backward = event.deltaY < 0 && Math.abs(current - destination) < 6;
      if (!forward && !backward) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastGesture > 180) amount = 0;
      lastGesture = now;
      amount += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (amount < 20) return;
      amount = 0;
      moving = true;
      const target = forward ? destination : 0;
      const start = performance.now();
      const animate = time => {
        const progress = Math.min(1, (time - start) / 1100);
        const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: current + (target - current) * eased, behavior: 'instant' });
        if (progress < 1) frame = requestAnimationFrame(animate);
        else { moving = false; frame = 0; }
      };
      frame = requestAnimationFrame(animate);
    };
    const onKey = event => { if (event.key === 'Escape' || ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancel(); };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('pointerdown', cancel);
    window.addEventListener('resize', cancel);
    return () => {
      cancel();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('resize', cancel);
    };
  }, []);
}
