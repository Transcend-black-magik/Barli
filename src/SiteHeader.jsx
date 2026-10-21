import React from 'react';

export default function SiteHeader({ onAction = () => {}, activePage = 'home' }) {
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
    <header className="stay-header shared-header" ref={headerRef}>
      <a className="stay-brand" href="/" aria-label="Barli Hotel home" onClick={() => setMenuOpen(false)}><span>Barli</span><small>HOTEL</small></a>
      <nav className={menuOpen ? 'stay-nav is-open' : 'stay-nav'} id="stay-navigation" aria-label="Main navigation">
        <a href="/" aria-current={activePage === 'home' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/rooms-and-suites/" aria-current={activePage === 'rooms' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Rooms &amp; Suites</a>
        <a href="/#amenities" onClick={() => setMenuOpen(false)}>Amenities</a>
        <button type="button" onClick={onAction}>Special Offers</button>
        <a href="/our-story/" aria-current={activePage === 'story' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Our Story</a>
        <button type="button" onClick={onAction}>Contact</button>
      </nav>
      <div className="stay-header-actions">
        <button className="stay-login" type="button" onClick={onAction}>Log in</button>
        <button className={menuOpen ? 'stay-menu is-open' : 'stay-menu'} ref={menuButtonRef} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="stay-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><span /><span /></button>
      </div>
    </header>
  );
}
