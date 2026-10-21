import React from 'react';
import { chapters } from '../../data/storyContent.js';

export default function StoryChapters() {
  return (
<>
{chapters.map((chapter, index) => <section key={chapter.title} className={`story-chapter story-chapter-${index + 1}`} data-story-stop data-story-reveal aria-labelledby={`story-chapter-${index}`}>
      <header className="story-chapter-heading"><span className="story-from-left">{chapter.eyebrow}</span>{index === 0 && <h2 className="story-chapter-banner"><span className="story-from-left">OUR</span><span className="story-from-right">STORY</span></h2>}<span className="story-chapter-number story-from-right" aria-hidden="true">{chapter.number}</span></header>
      <div className="story-mosaic">
        <figure className="story-tile story-tile-tall story-from-left"><img src={chapter.images[0]} alt={chapter.alts[0]} loading="lazy" /></figure>
        <div className="story-chapter-copy story-from-right"><div><h3 id={`story-chapter-${index}`}>{chapter.title}</h3><p>{chapter.copy}</p></div><dl><dt>{chapter.label}</dt><dd>{chapter.value}</dd></dl></div>
        <figure className="story-tile story-tile-wide story-from-right"><img src={chapter.images[1]} alt={chapter.alts[1]} loading="lazy" /></figure>
        <figure className="story-tile story-tile-small story-from-left"><img src={chapter.images[2]} alt={chapter.alts[2]} loading="lazy" /></figure>
        <figure className="story-tile story-tile-end story-from-right"><img src={chapter.images[3]} alt={chapter.alts[3]} loading="lazy" /></figure>
      </div>
    </section>)}
</>
  );
}
