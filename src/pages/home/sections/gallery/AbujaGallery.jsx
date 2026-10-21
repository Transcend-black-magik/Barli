import React from 'react';
import credits from '../../../../data/photography/abuja-landmark-credits.json';

const places = [
  { name: 'National Mosque', area: 'CENTRAL ABUJA', image: '/abuja-mosque.jpg', note: 'Golden domes and a distinctive city silhouette.' },
  { name: 'Zuma Rock', area: 'NEAR ABUJA / NIGER STATE', image: '/abuja-zuma.jpg', note: 'A dramatic landmark beyond the capital.' },
  { name: 'National Christian Centre', area: 'CENTRAL ABUJA', image: '/abuja-church.jpg', note: 'A striking perspective on the city’s architecture.' },
  { name: 'Millennium Park', area: 'ABUJA', image: '/abuja-park.jpg', note: 'Make room for a quieter moment in the city.' },
];

export default function AbujaGallery() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section className={`abuja-gallery${visible ? ' gallery-entered' : ''}`} id="gallery" ref={ref} aria-labelledby="gallery-title">
    <header><div><p className="rooms-eyebrow">THE CAPITAL, THROUGH A DIFFERENT LENS</p><h2 id="gallery-title">Postcards from <em>Abuja.</em></h2></div><p>Landmarks. Open spaces. A city to discover.</p></header>
    <div className="abuja-gallery-grid">{places.map((place, index) => <article key={place.name} style={{ '--gallery-delay': `${index * .14}s` }}>
      <a className="abuja-photo" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' Nigeria')}`} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${place.name} on the map`}><img src={place.image} alt={place.name} loading="lazy" /><span>0{index + 1} <span aria-hidden="true">&#8599;</span></span></a>
      <span className="abuja-area">{place.area}</span><h3>{place.name}</h3><p>{place.note}</p>
    </article>)}</div>
    <details className="gallery-credits"><summary>Photography credits</summary>{credits.map(item => <p key={item.file}><a href={item.source} target="_blank" rel="noopener noreferrer">{item.file}</a> by {item.author} &middot; <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a>. Display cropped.</p>)}</details>
  </section>;
}
