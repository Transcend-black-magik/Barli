import React from 'react';

// One deliberate scroll carries the hero into the next section.
export default function useHeroTransition() {
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0;
    let moving = false;
    let lastGesture = 0;
    let amount = 0;
    let cooldownUntil = 0;
    const cancel = () => { cancelAnimationFrame(frame); moving = false; amount = 0; };
    const onWheel = event => {
      if (!media.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || document.querySelector('dialog[open], .stay-nav.is-open')) return;
      if (event.target.closest('input, select, textarea, dialog')) return;
      if (moving || performance.now() < cooldownUntil) { event.preventDefault(); return; }
      const stack = document.querySelector('.hotel-stack');
      if (!stack) return;
      const header = document.querySelector('.shared-header').offsetHeight;
      const destination = stack.getBoundingClientRect().top + window.scrollY - header;
      const current = window.scrollY;
      const sceneHeight = stack.querySelector('.hotel-stack-scene').offsetHeight;
      const stops = [0, destination, destination + sceneHeight, destination + sceneHeight * 2];
      const restaurant = document.querySelector('.restaurant-section');
      if (restaurant) stops.push(restaurant.getBoundingClientRect().top + current - header);
      const target = event.deltaY > 0 ? stops.find(stop => stop > current + 6) : [...stops].reverse().find(stop => stop < current - 6);
      if (target === undefined || current > stops[stops.length - 1] + 6) return;
      const innerList = event.target.closest('.rooms-cards');
      if (innerList && (event.deltaY > 0 ? innerList.scrollTop + innerList.clientHeight < innerList.scrollHeight - 2 : innerList.scrollTop > 2)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastGesture > 180) amount = 0;
      lastGesture = now;
      amount += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (amount < 20) return;
      amount = 0;
      moving = true;
      const start = performance.now();
      const animate = time => {
        const progress = Math.min(1, (time - start) / 1100);
        const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: current + (target - current) * eased, behavior: 'instant' });
        if (progress < 1) frame = requestAnimationFrame(animate);
        else { moving = false; frame = 0; cooldownUntil = performance.now() + 300; }
      };
      frame = requestAnimationFrame(animate);
    };
    const onKey = event => { if (event.key === 'Escape' || ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancel(); };
    let touchConsumed = false;
    let touchY = null;
    let touchX = null;
    const onTouchStart = event => {
      cancel();
      touchConsumed = false;
      cooldownUntil = 0;
      touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
      touchX = event.touches.length === 1 ? event.touches[0].clientX : null;
    };
    const onTouchMove = event => {
      if (touchY === null || event.touches.length !== 1) return;
      if (touchConsumed && !moving) { if (event.cancelable) event.preventDefault(); return; }
      const deltaY = touchY - event.touches[0].clientY;
      const deltaX = touchX - event.touches[0].clientX;
      if (Math.abs(deltaY) < 8 || Math.abs(deltaX) > Math.abs(deltaY)) return;
      onWheel({ deltaY, deltaX, deltaMode: 0, ctrlKey: false, target: event.target, preventDefault: () => { if (event.cancelable) event.preventDefault(); } });
      if (moving) touchConsumed = true;
    };
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('pointerdown', cancel);
    window.addEventListener('resize', cancel);
    return () => {
      cancel();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('resize', cancel);
    };
  }, []);
}
