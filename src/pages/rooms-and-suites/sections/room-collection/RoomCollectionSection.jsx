import React from 'react';
import { roomCollection } from '../../data/roomCollection.js';
import RoomFeature from './RoomFeature.jsx';

export default function RoomCollectionSection() {
  return (
<section className="rooms-editorial" id="our-rooms" aria-labelledby="our-rooms-heading">
        <header className="rooms-editorial-heading"><p>SPACES TO SETTLE IN.<br />MOMENTS TO MAKE YOUR OWN.</p><h1 id="our-rooms-heading"><span className="heading-our">OUR</span><span className="heading-rooms">ROOMS</span></h1><span className="rooms-collection-mark">BARLI / 04</span></header>
        <RoomFeature room={roomCollection[0]} index={0} />
        <div className="rooms-paired-features" data-room-stop>
          <RoomFeature room={roomCollection[1]} index={1} />
          <RoomFeature room={roomCollection[2]} index={2} />
        </div>
        <RoomFeature room={roomCollection[3]} index={3} scrollStop />
        <div className="rooms-editorial-end" data-room-stop><p>Your next chapter begins with a little escape.</p><a href="/#booking">Find your stay <span aria-hidden="true">&#8599;</span></a><small>Collection photography is illustrative. Confirm room features and availability before booking.</small></div>
      </section>
  );
}
