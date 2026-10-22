import React from 'react';
import RoomCollectionSection from './sections/room-collection/RoomCollectionSection.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import './RoomsPage.css';

export default function RoomsPage() {
  const ref = React.useRef(null);
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
