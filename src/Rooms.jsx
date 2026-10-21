import React from 'react';

const rooms = [
  { name: 'Deluxe Room', note: 'An invitation to unwind.', image: '/room-deluxe.jpg', alt: 'Elegant bedroom with a generously sized bed and warm bedside lighting' },
  { name: 'Garden Retreat', note: 'A softer pace, a quieter place.', image: '/room-garden.jpg', alt: 'Bright hotel bedroom with soft neutral furnishings' },
  { name: 'Signature Suite', note: 'Room for a little more indulgence.', image: '/room-suite.jpg', alt: 'Spacious hotel suite with a large bed and contemporary finishes' },
  { name: 'The Penthouse', note: 'Your own world, above it all.', image: '/room-penthouse.jpg', alt: 'Refined hotel interior with luxurious bedding and natural light' },
];

export default function Rooms() {
  const [active, setActive] = React.useState(0);
  return (
    <section className="rooms-section" id="rooms" aria-labelledby="rooms-heading">
      <div className="rooms-heading">
        <p className="rooms-eyebrow">THE BARLI COLLECTION</p>
        <h2 id="rooms-heading">Somewhere <em>just for you.</em></h2>
        <p>Four ways to settle in. One feeling of being exactly where you belong.</p>
      </div>
      <div className="rooms-layout">
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
      </div>
    </section>
  );
}
