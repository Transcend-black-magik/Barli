import React from 'react';

export default function AboutHero() {
  return <section className="about-hero" aria-labelledby="about-title" data-reveal><div className="about-hero-copy reveal-up"><span className="about-pill">About us</span><h1 id="about-title">Where <em>Hospitality</em> Meets<br />Excellence</h1><p>Considered comfort, meaningful moments, and a warm welcome.<br />A little introduction to the feeling of Barli.</p></div><figure className="about-hero-photo reveal-up"><img src="/amenity-dining.jpg" alt="A welcoming restaurant with inviting tables and warm natural finishes" fetchPriority="high" /><figcaption>THE BARLI WAY / MAKE YOURSELF AT HOME</figcaption></figure></section>;
}
