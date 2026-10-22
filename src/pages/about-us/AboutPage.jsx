import React from 'react';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import usePageReveal from '../../hooks/usePageReveal.js';
import AboutHero from './sections/hero/AboutHero.jsx';
import OurWayStack from './sections/our-way/OurWayStack.jsx';
import './AboutPage.css';

export default function AboutPage() {
  const ref = React.useRef(null);
  usePageReveal(ref);
  return <div className="about-page" ref={ref}><main><AboutHero /><OurWayStack /><section className="about-discover" data-reveal><div className="reveal-left"><span className="page-eyebrow">BEYOND THE EVERYDAY</span><h2>Good days begin<br /><em>with a little curiosity.</em></h2><p>Discover the room collection, find a seat at our table, or let Abuja show you a different perspective.</p><div><a className="navy-button" href="/rooms-and-suites/">Explore our rooms ↗</a><a className="underlined-link" href="/contact/">Say hello ↗</a></div></div><figure className="reveal-right"><img src="/abuja-park.jpg" alt="Green lawns and pathways at Millennium Park in Abuja" loading="lazy" /></figure></section><section className="about-invitation" data-reveal><div className="reveal-up"><span className="about-pill">A LITTLE ESCAPE AWAITS</span><h2>Arrive as you are.<br /><em>Stay a little longer.</em></h2><a className="navy-button" href="/contact/">Let's plan your stay ↗</a><p>Illustrative hotel photography. Location photo: Akum20, <a href="https://commons.wikimedia.org/wiki/File:Millennium_park,_Abuja.jpg" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>, displayed cropped.</p></div></section></main><SiteFooter /></div>;
}
