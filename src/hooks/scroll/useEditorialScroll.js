import React from 'react';
import useSectionTransitionSupport from './useSectionTransitionSupport.js';

export default function useEditorialScroll(rootRef, selector = '[data-room-stop]') {
  const supported = useSectionTransitionSupport();
  React.useEffect(() => {
    if (!supported) return;
    const root = rootRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0, locked = false, cooldown = 0, touchStart = null, touchUsed = false;
    let gesture = 0, previousInput = 0;
    const cancel = () => { cancelAnimationFrame(frame); locked = false; gesture = 0; };
    const move = (delta, event) => {
      if (!motion.matches || delta === 0 || event.target.closest('input,select,textarea,button,dialog')) return;
      if (locked || performance.now() < cooldown) { event.preventDefault(); return; }
      const header = document.querySelector('.shared-header')?.offsetHeight || 80;
      const current = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const sections = [...root.querySelectorAll(selector)];
      const stops = [0, ...sections.map(section => Math.round(Math.max(0, Math.min(max, section.getBoundingClientRect().top + current - header - 20))))].filter((stop, index, values) => index === 0 || stop - values[index - 1] > 60);
      const destination = delta > 0 ? stops.find(stop => stop > current + 8) : [...stops].reverse().find(stop => stop < current - 8);
      if (destination === undefined || current > stops.at(-1) + 10) return;
      // Tall sections need native scrolling so their lower copy remains readable.
      if (Math.abs(destination - current) > window.innerHeight - header) return;
      event.preventDefault();
      const now = performance.now();
      if (now - previousInput > 180 || Math.sign(gesture) !== Math.sign(delta)) gesture = 0;
      previousInput = now;
      gesture += delta;
      if (Math.abs(gesture) < 20) return;
      gesture = 0;
      locked = true;
      const start = performance.now();
      const animate = time => {
        const p = Math.min(1, (time - start) / 1150);
        const eased = p < .5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        window.scrollTo({ top: current + (destination - current) * eased, behavior: 'instant' });
        if (p < 1) frame = requestAnimationFrame(animate);
        else { locked = false; cooldown = performance.now() + 250; }
      };
      frame = requestAnimationFrame(animate);
    };
    const wheel = event => { if (!event.ctrlKey && Math.abs(event.deltaY) > Math.abs(event.deltaX)) move(event.deltaY, event); };
    const touchstart = event => { cancel(); cooldown = 0; touchUsed = false; touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; };
    const touchmove = event => {
      if (!touchStart || event.touches.length !== 1) return;
      const dy = touchStart.y - event.touches[0].clientY, dx = touchStart.x - event.touches[0].clientX;
      if (Math.abs(dx) > Math.abs(dy) || Math.abs(dy) < 30) return;
      if (touchUsed) { if (event.cancelable) event.preventDefault(); return; }
      move(dy, event); if (locked) touchUsed = true;
    };
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('touchstart', touchstart, { passive: true });
    window.addEventListener('touchmove', touchmove, { passive: false });
    window.addEventListener('keydown', cancel); window.addEventListener('resize', cancel);
    return () => { cancel(); window.removeEventListener('wheel', wheel); window.removeEventListener('touchstart', touchstart); window.removeEventListener('touchmove', touchmove); window.removeEventListener('keydown', cancel); window.removeEventListener('resize', cancel); };
  }, [rootRef, selector, supported]);
}

