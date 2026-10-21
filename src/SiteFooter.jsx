import React from 'react';

function ForestScenery({ className }) {
  return <div className={className} aria-hidden="true"><div className="footer-scenery-track">{[0, 1].map(group => <div className="footer-scenery-repeat" key={group}><img src="/footer-forest.jpg" alt="" loading="lazy" /><img src="/footer-forest.jpg" alt="" loading="lazy" /></div>)}</div></div>;
}

export default function SiteFooter() {
  const [sceneryPaused, setSceneryPaused] = React.useState(false);
  const [message, setMessage] = React.useState('');
  return <footer className={`barli-footer landscape-footer${sceneryPaused ? " is-scenery-paused" : ""}`} id="footer" aria-label="Barli Hotel footer">
    <ForestScenery className="footer-forest-backdrop" />
    <ForestScenery className="footer-real-trees" />
    <div className="landscape-footer-body"><div className="landscape-footer-columns">
      <nav className="landscape-footer-nav" aria-label="Footer navigation"><a href="/our-story/">About Barli</a><a href="/rooms-and-suites/">Rooms &amp; Suites</a><a href="/#amenities">Amenities</a><a href="/#restaurant">Dining</a><a href="/#gallery">Hotel Gallery</a><a href="/#experiences">Experiences &amp; Location</a><a className="landscape-brand" href="/" aria-label="Barli home">Barli<span>HOTEL</span></a></nav>
      <div className="footer-newsletter"><h2>Get Updates</h2><p>Stay a little closer to Barli.<br />News, little escapes, and special moments.</p><form onSubmit={event => { event.preventDefault(); setMessage('Newsletter registration is coming soon. No details have been sent or saved.'); }}><label><span className="footer-field-label">Email address</span><input type="email" name="email" placeholder="*Email" autoComplete="email" required maxLength={254} /></label><div className="footer-signup-row"><label><span className="footer-field-label">First name</span><input name="firstName" placeholder="*First Name" autoComplete="given-name" required maxLength={80} /></label><button type="submit">SIGN UP <span aria-hidden="true">&#8599;</span></button></div><p className="footer-signup-status" role="status">{message}</p></form></div>
      <div className="landscape-footer-contact"><a className="footer-message-link" href="/#booking">Plan Your Visit <span aria-hidden="true">&#8594;</span></a><p>A thoughtful stay.<br />An extraordinary escape.</p><a href="/#faq">Questions about your stay?<br /><span>Find your answers here.</span></a><a href="https://www.google.com/maps/search/?api=1&query=Abuja+Nigeria" target="_blank" rel="noopener noreferrer">Explore Abuja, Nigeria <span aria-hidden="true">&#8599;</span></a><div className="footer-seal" aria-hidden="true"><span>Barli</span><small>STAY A LITTLE LONGER</small></div></div>
    </div></div>
    <div className="landscape-footer-base"><div><p>&copy; {new Date().getFullYear()} Barli Hotel. All rights reserved.</p><button className="footer-scenery-control" type="button" onClick={() => setSceneryPaused(value => !value)} aria-pressed={sceneryPaused}>{sceneryPaused ? 'Play scenery' : 'Pause scenery'}</button><a href="/#faq">Guest information</a><a href="#" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>Back to top <span aria-hidden="true">&#8593;</span></a></div></div>
  </footer>;
}
