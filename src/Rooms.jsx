import React from 'react';

const rooms = [
  { name: 'Deluxe Room', note: 'An invitation to unwind.', image: '/room-deluxe.jpg', alt: 'Elegant bedroom with a generously sized bed and warm bedside lighting' },
  { name: 'Garden Retreat', note: 'A softer pace, a quieter place.', image: '/room-garden.jpg', alt: 'Bright hotel bedroom with soft neutral furnishings' },
  { name: 'Signature Suite', note: 'Room for a little more indulgence.', image: '/room-suite.jpg', alt: 'Spacious hotel suite with a large bed and contemporary finishes' },
  { name: 'The Penthouse', note: 'Your own world, above it all.', image: '/room-penthouse.jpg', alt: 'Refined hotel interior with luxurious bedding and natural light' },
];

export default function Rooms({ fullPage = false, revealed }) {
  const sectionRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (revealed !== undefined) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [revealed]);
  const entered = revealed === undefined ? inView : revealed;
  const [layout, setLayout] = React.useState(fullPage ? 'list' : 'gallery');
  const [changing, setChanging] = React.useState(false);
  const [filter, setFilter] = React.useState('Deluxe Room');
  const timer = React.useRef(null);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const switchLayout = () => {
    if (changing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLayout(value => value === 'list' ? 'gallery' : 'list'); return; }
    setChanging(true);
    timer.current = setTimeout(() => { setLayout(value => value === 'list' ? 'gallery' : 'list'); setChanging(false); }, 280);
  };
  const [active, setActive] = React.useState(0);
  return (
    <section ref={sectionRef} className={`rooms-section${fullPage ? " rooms-full-page" : ""}${entered ? " rooms-entered" : ""}`} id="room-collection" aria-labelledby="rooms-heading">
      <div className="rooms-heading">
        <div className="rooms-toolbar"><p className="rooms-eyebrow">THE BARLI COLLECTION</p><button type="button" className={`rooms-layout-toggle ${layout === 'list' ? 'is-list' : ''}`} onClick={switchLayout} aria-label={layout === 'gallery' ? 'Switch to detailed room list' : 'Switch to photo preview'} aria-pressed={layout === 'list'} title={layout === 'gallery' ? 'Detailed list' : 'Photo preview'}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="7" height="16" rx="1.5"/><path d="M14 5h7m-7 7h7m-7 7h7"/></svg><span>{layout === 'gallery' ? 'List view' : 'Gallery view'}</span></button></div>
        <h2 id="rooms-heading">{fullPage ? <>Rooms <em>&amp; suites.</em></> : <>Somewhere <em>just for you.</em></>}</h2>
        <p>Four ways to settle in. One feeling of being exactly where you belong.</p>
      </div>
      <div key={layout} className={`rooms-view ${changing ? 'is-changing' : ''}`}>
      {layout === 'gallery' ? <div className="rooms-layout">
        <div className="rooms-list" aria-label="Explore our room types">
          {rooms.map((room, index) => (
            <button key={room.name} className={`room-choice${active === index ? ' is-active' : ''}`} type="button" aria-pressed={active === index} aria-controls="room-preview" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <span className="room-number">0{index + 1}</span>
              <span className="room-name">{room.name}</span>
              <span className="room-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
          <p className="rooms-hint">A space for every kind of escape.</p>
        </div>
        <div className="room-preview" id="room-preview">
          <div className="room-photos">
            {rooms.map((room, index) => <img key={room.name} className={active === index ? 'is-active' : ''} src={room.image} alt={room.alt} loading="lazy" aria-hidden={active !== index} />)}
            <span className="room-photo-index" aria-hidden="true">0{active + 1} / 04</span>
          </div>
          <div className="room-caption" aria-live="polite"><span>{rooms[active].name}</span><p>{rooms[active].note}</p></div>
        </div>
      </div> : <div className="rooms-catalog">
        <div className="rooms-filters" aria-label="Accommodation type">{['Deluxe Room', 'Garden Retreat', 'Signature Suite', 'The Penthouse'].map(type => <button key={type} type="button" aria-pressed={filter === type} onClick={() => setFilter(type)}>{type}</button>)}</div>
        <div className="rooms-cards" key={filter} aria-label={`${filter} accommodation`}>
          {[0, 1].map((index) => {
            const offset = ['Deluxe Room', 'Garden Retreat', 'Signature Suite', 'The Penthouse'].indexOf(filter);
            const room = rooms[(offset + index) % rooms.length];
            return <article className="room-card reference-room-card" key={`${filter}-${index}`}>
              <div className="catalog-photo"><img src={room.image} alt={room.alt} loading="lazy" /><span className="catalog-rating"><span aria-hidden="true">&#9733;</span> 4.5</span></div>
              <div className="room-card-intro"><span>{filter.toUpperCase()} {String(index + 1).padStart(2, '0')} / LAYOUT PACK</span><h3>Best option to stay here for your summer vacations</h3><a href="/#booking">Meet the Host <span aria-hidden="true">&#8599;</span></a></div>
              <div className="room-card-details"><p className="room-rate">${index === 0 ? '140' : '180'}<span>/night</span></p><small>Booking information</small><span className="catalog-information">Basic Information</span><dl><div><dt>Total Rooms</dt><dd>1 King + 2</dd></div><div><dt>Bathrooms</dt><dd>3 Attached</dd></div><div><dt>Internet</dt><dd>100Mbps</dd></div><div><dt>Covered Parking</dt><dd>Yes Free</dd></div></dl></div>
              <div className="room-card-action"><div><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 21V5h14v16M3 21h18M9 8h2m2 0h2m-6 4h2m2 0h2m-6 4h2m2 0h2"/></svg><span>Cleanliness<small>Lorem ipsum dolor sit amet consectetur adipisicing elit.</small></span></div><div><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 21V3h14v18M3 21h18M9 7h2m2 0h2m-6 4h2m2 0h2m-5 10v-6h4v6"/></svg><span>Amenities<small>Lorem ipsum dolor sit amet consectetur adipisicing elit.</small></span></div><a className="room-card-book" href="/#booking">Book Now!</a></div>
            </article>;
          })}
        </div>
      </div>}
      </div>
      {!fullPage && <a className="rooms-view-more" href="/rooms-and-suites/">View more rooms &amp; suites <span aria-hidden="true">&#8599;</span></a>}
    </section>
  );
}
