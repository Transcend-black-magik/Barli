import React from 'react';
import RoomCollectionSection from './sections/room-collection/RoomCollectionSection.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import { getRoomPairHeight } from '../../utils/scroll/scrollPolicy.js';
import './RoomsPage.css';

export default function RoomsPage() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const pair = ref.current.querySelector('.rooms-paired-features');
    const copies = [...pair.querySelectorAll('.collection-room-copy')];
    let frame = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const style = getComputedStyle(pair);
        const rows = [...pair.querySelectorAll('.collection-room')];
        const rowStyle = getComputedStyle(rows[0]);
        const layout = getRoomPairHeight({
          viewportHeight: window.visualViewport?.height ?? window.innerHeight,
          headerHeight: document.querySelector('.shared-header')?.offsetHeight || 80,
          copyHeights: copies.map(copy => copy.scrollHeight),
          gap: parseFloat(style.rowGap) || 0,
          outerPadding: parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
          rowPadding: parseFloat(rowStyle.paddingTop) + parseFloat(rowStyle.paddingBottom),
        });
        pair.style.setProperty('--room-pair-height', `${layout.height}px`);
        pair.dataset.fitsViewport = String(layout.fitsViewport);
      });
    };
    const observer = new ResizeObserver(measure);
    copies.forEach(copy => observer.observe(copy));
    window.addEventListener('resize', measure);
    window.visualViewport?.addEventListener('resize', measure);
    document.fonts.ready.then(measure);
    measure();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', measure); window.visualViewport?.removeEventListener('resize', measure); };
  }, []);
  React.useEffect(() => {
    let frame = 0, started = false;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('feature-visible', entry.isIntersecting)), { threshold: .15 });
    const start = () => {
      if (started) return;
      started = true;
      // Let the page slide finish before triggering its own side entrances.
      frame = requestAnimationFrame(() => {
        ref.current?.querySelectorAll('.collection-room, .rooms-editorial-heading').forEach(element => observer.observe(element));
      });
    };
    window.addEventListener('barli:page-ready', start);
    if (document.documentElement.dataset.routeTransition !== 'pending') start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('barli:page-ready', start); };
  }, []);
  return <div className="rooms-story-page" ref={ref}>
    <main>
      <RoomCollectionSection />
    </main>
    <SiteFooter />
  </div>;
}
