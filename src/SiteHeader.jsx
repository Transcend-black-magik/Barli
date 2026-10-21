import React from 'react';

export default function SiteHeader({ onAction = () => {}, activePage = 'home', reference = false }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef(null);
  const headerRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = event => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="stay-header" ref={headerRef}>
      <a className="stay-brand" href="/" aria-label="Barli Hotel home" onClick={() => setMenuOpen(false)}><span>Barli</span><small>HOTEL</small></a>
      <nav className={menuOpen ? 'stay-nav is-open' : 'stay-nav'} id="stay-navigation" aria-label="Main navigation">
        <a href="/" aria-current={activePage === 'home' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Home</a>
        <button type="button" onClick={onAction}>{reference ? 'Rooms & Suites' : 'Rooms'}</button>
        <button type="button" onClick={onAction}>{reference ? 'Amenities' : 'Dining'}</button>
        <button type="button" onClick={onAction}>{reference ? 'Special Offers' : 'Events'}</button>
        <a href="/our-story/" aria-current={activePage === 'story' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{reference ? 'About Us' : 'Our Story'}</a>
        {reference && <button type="button" onClick={onAction}>Contact</button>}
      </nav>
      <div className="stay-header-actions">
        <button className="stay-login" type="button" onClick={onAction}>Log in</button>
        {!reference && <button className="stay-contact" type="button" onClick={onAction}>Contact <span aria-hidden="true">&#8599;</span></button>}
        <button className={menuOpen ? 'stay-menu is-open' : 'stay-menu'} ref={menuButtonRef} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="stay-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><span /><span /></button>
      </div>
    </header>
  );
}
