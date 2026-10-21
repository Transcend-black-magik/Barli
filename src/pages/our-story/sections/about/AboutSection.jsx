import React from 'react';
import { introduction } from '../../data/storyContent.js';

export default function AboutSection() {
  return (
<section className="story-about" aria-labelledby="story-title">
      <header className="story-section-heading" data-story-reveal><p className="story-from-left">LEARN A LITTLE MORE<br />ABOUT THE WAY WE STAY.</p><h1 id="story-title"><span className="story-from-left">ABOUT</span><span className="story-from-right">BARLI</span></h1><span className="story-mini-brand story-from-right">THOUGHTFULLY YOURS.</span></header>
      <div className="story-about-grid"><span className="story-outline-brand" aria-hidden="true">BARLI</span>{introduction.map(item => <article className="story-intro-row" key={item.title} data-story-reveal><figure className="story-from-left"><img src={item.image} alt={item.alt} loading="lazy" /></figure><div className="story-from-right"><span className="story-intro-number">{item.number}</span><h2>{item.title}</h2><p>{item.copy}</p></div></article>)}</div>
    </section>
  );
}
