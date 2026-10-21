import React from 'react';

export default function WhyChooseSection() {
  return (
<section className="story-why" data-story-stop aria-labelledby="story-why-title"><header data-story-reveal><h2 id="story-why-title" className="story-from-left">Why Choose <em>Barli?</em></h2><p className="story-from-right">A thoughtful setting. A warm welcome. Space to make the experience your own.</p></header><div className="story-why-background"><div className="story-why-panel" data-story-reveal><div className="story-why-cards">{[['Team members (sample)', '20+', '/hotel-lounge-neutral.webp'], ['Guest rating (sample)', '4.9/5', '/amenity-dining.jpg'], ['A different perspective', 'Discovery', '/abuja-park.jpg']].map(([label, value, image], index) => <article key={value} className={index === 0 ? 'story-from-left' : 'story-from-right'}><span>{label}<span aria-hidden="true">&#8599;</span></span><div><h3>{value}</h3><img src={image} alt={label} loading="lazy" /></div></article>)}</div><p className="story-sample-note"><strong>Illustrative figures</strong><br />Staff count and guest rating are sample values, not verified hotel statistics.</p><div className="story-values"><span>WARMTH</span><span>CURIOSITY</span><span>COMFORT</span><span>CONNECTION</span></div></div></div></section>
  );
}
