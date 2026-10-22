import React from 'react';
import { roomCategories, categoryPath } from '../../data/roomCatalog.js';

export default function RoomFeature({ room, index, scrollStop = false }) {
  const href = categoryPath(roomCategories[index].slug);
  return <article className={`collection-room${index % 2 ? ' room-reversed' : ''}`} id={`collection-room-${index + 1}`} data-room-stop={scrollStop ? '' : undefined} key={room.name}>
          <div className="collection-room-copy"><span className="collection-room-kicker">THE BARLI COLLECTION / 0{index + 1}</span><h3><a href={href}>{room.name}</a><span aria-hidden="true">&mdash;</span></h3><h4>{room.title}</h4><p>{room.description}</p><span className="collection-room-mood">{room.mood}</span><a href={href}>Explore these rooms <span aria-hidden="true">&#8599;</span></a></div>
          <figure className="collection-room-image"><span className="collection-room-frame" aria-hidden="true" /><span className="collection-room-number" aria-hidden="true">0{index + 1}</span><a className="collection-category-link" href={href} aria-label={`Explore ${room.name} rooms`}><img src={room.image} alt={room.alt} loading="lazy" /></a></figure>
        </article>;
}
