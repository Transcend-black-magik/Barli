import React from 'react';
import Rooms from './Rooms.jsx';
import Amenities from './Amenities.jsx';

const details = [
  ['Check-in - Check-out', 'Check-in from 3:00 pm', 'Check-out until noon'],
  ['Rooms & Suites', '265 rooms and 31 plush suites'],
  ['Current Temperature', '23.01\u00b0C'],
  ['Dining', '5 restaurants and bars'],
  ['Wellness', 'J Wellness Circle'],
  ['Hotel Essentials', 'GST/TIN: N/A'],
];

function DetailIcon({ index }) {
  const paths = [
    <><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></>,
    <><path d="M3 19V8m18 11V8M3 16h18M3 12h18v4M6 12V8h5v4m2 0V8h5v4"/></>,
    <><path d="M10 5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0ZM12 8v9"/></>,
    <><path d="M5 3v6a3 3 0 0 0 6 0V3M8 3v18M19 21V3c-4 2-4 10 0 10"/></>,
    <><path d="M12 20C5 19 2 15 3 9c4 0 7 2 9 6m0 5c7-1 10-5 9-11-4 0-7 2-9 6m0 5C7 14 7 8 12 3c5 5 5 11 0 17Z"/></>,
    <><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h6m-6 4h6m-6 4h3"/></>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
}

export default function HotelDetails({ onBook }) {
  const [amenitiesRevealed, setAmenitiesRevealed] = React.useState(false);
  const [roomsRevealed, setRoomsRevealed] = React.useState(false);
  const stackRef = React.useRef(null);
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    const stack = stackRef.current;
    const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0;
    let target = 0;
    let current = 0;
    let lastTime = 0;
    const render = time => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      // Follow wheel and touch movement with a consistent, gentle catch-up.
      current += (target - current) * (1 - Math.exp(-elapsed / 165));
      if (!media.matches || Math.abs(target - current) < .0002) current = target;
      const phase = current * 2;
      const sceneBounds = stack.querySelector('.hotel-stack-scene').getBoundingClientRect();
      const visible = sceneBounds.top < window.innerHeight * .9 && sceneBounds.bottom > 100;
      setEntered(previous => !media.matches || (visible && phase < .35 && (previous || phase < .12)));
      // Reset while leaving; on return, wait until the room panel is visible.
      setRoomsRevealed(previous => !media.matches || (visible && phase > .35 && phase < 1.35 && (previous || phase < 1.12)));
      setAmenitiesRevealed(!media.matches || (visible && phase > 1.35));
      stack.style.setProperty('--rooms-lift', `${Math.max(0, phase - 1) * -105}%`);
      stack.style.setProperty('--details-lift', `${Math.min(1, phase) * -105}%`);
      stack.querySelector('.hotel-details').inert = media.matches && phase > .98;
      if (current !== target) frame = requestAnimationFrame(render);
      else { frame = 0; lastTime = 0; }
    };
    const schedule = () => {
      const scene = stack.querySelector('.hotel-stack-scene');
      const travel = stack.offsetHeight - scene.offsetHeight;
      target = media.matches && travel > 0 ? Math.max(0, Math.min(1, (scene.getBoundingClientRect().top - stack.getBoundingClientRect().top) / travel)) : 0;
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', schedule); };
  }, []);
  return (
    <div className="hotel-stack" ref={stackRef}>
      <span id="amenities" className="amenities-scroll-target" aria-hidden="true" />
      <span id="rooms" className="rooms-scroll-target" aria-hidden="true" />
      <div className="hotel-stack-scene">
        <section className={`hotel-details${entered ? " has-entered" : ""}`} aria-labelledby="hotel-details-title">
          <div className="hotel-details-intro">
            <h2 id="hotel-details-title">Hotel Details</h2>
            <button className="hotel-details-book" type="button" onClick={onBook}>BOOKING NOW <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></button>
          </div>
          <dl className="hotel-details-list">
            {details.map(([label, title, subtitle], index) => <div key={label}>
              <dt><DetailIcon index={index} />{label}</dt>
              <dd>{title}{subtitle && <span className="hotel-detail-secondary">{subtitle}</span>}</dd>
            </div>)}
          </dl>
        </section>
        <Rooms revealed={roomsRevealed} />
        <Amenities revealed={amenitiesRevealed} />
      </div>
    </div>
  );
}
