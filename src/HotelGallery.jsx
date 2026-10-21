import React from 'react';


const places = [
  { name: 'Rooms & Suites', area: 'REST', image: '/room-deluxe.jpg', note: 'A space to settle in and make your own.', href: '/rooms-and-suites/', source: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32' },
  { name: 'Dining & Gatherings', area: 'SAVOUR', image: '/amenity-dining.jpg', note: 'Good food and moments worth sharing.', href: '/#restaurant', source: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' },
  { name: 'Spa & Wellness', area: 'UNWIND', image: '/amenity-spa.jpg', note: 'A little time to restore your rhythm.', href: '/#amenities', source: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef' },
  { name: 'Poolside Moments', area: 'RELAX', image: '/amenity-pool.jpg', note: 'Slow afternoons, a refreshing change of pace.', href: '/#amenities', source: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7' },
];

export default function HotelGallery() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section className={`abuja-gallery${visible ? ' gallery-entered' : ''}`} id="gallery" ref={ref} aria-labelledby="gallery-title">
    <header><div><p className="rooms-eyebrow">A CLOSER LOOK AT YOUR STAY</p><h2 id="gallery-title">Life at <em>Barli.</em></h2></div><p>Rooms. Dining. Moments of relaxation.</p></header>
    <div className="abuja-gallery-grid">{places.map((place, index) => <article key={place.name} style={{ '--gallery-delay': `${index * .14}s` }}>
      <a className="abuja-photo" href={place.href} aria-label={`Explore ${place.name}`}><img src={place.image} alt={place.name} loading="lazy" /><span>0{index + 1} <span aria-hidden="true">&#8599;</span></span></a>
      <span className="abuja-area">{place.area}</span><h3>{place.name}</h3><p>{place.note}</p>
    </article>)}</div>
    <details className="gallery-credits"><summary>Photography credits</summary><p>Illustrative hotel photography from Unsplash. Actual property photographs will replace these previews.</p>{places.map(place => <p key={place.name}><a href={place.source} target="_blank" rel="noopener noreferrer">{place.name} photography</a></p>)}</details>
  </section>;
}
