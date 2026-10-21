import React from 'react';

export default function RoomFeature({ room, index, scrollStop = false }) {
  return <article className={`collection-room${index % 2 ? ' room-reversed' : ''}`} id={`collection-room-${index + 1}`} data-room-stop={scrollStop ? '' : undefined} key={room.name}>
          <div className="collection-room-copy"><span className="collection-room-kicker">THE BARLI COLLECTION / 0{index + 1}</span><h3>{room.name}<span aria-hidden="true">&mdash;</span></h3><h4>{room.title}</h4><p>{room.description}</p><span className="collection-room-mood">{room.mood}</span><a href="/#booking">Enquire about this stay <span aria-hidden="true">&#8599;</span></a></div>
          <figure className="collection-room-image"><span className="collection-room-frame" aria-hidden="true" /><span className="collection-room-number" aria-hidden="true">0{index + 1}</span><div><img src={room.image} alt={room.alt} loading="lazy" /></div></figure>
        </article>;
}
