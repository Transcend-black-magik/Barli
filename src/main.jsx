import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import './styles.css';
import './home.css';
import Home from './Home.jsx';
import RoomsPage from './RoomsPage.jsx';
import ErrorBoundary, { ErrorPage } from './ErrorPage.jsx';
import SiteHeader from './SiteHeader.jsx';

function MindMark() {
  return <svg viewBox="0 0 20 24" fill="none" aria-hidden="true"><path d="M10 22C5 18 3 13 4 8C5 2 12 0 15 5C18 10 15 17 10 22Z" stroke="currentColor" strokeWidth="1.25"/><path d="M10 19C7 15 6 11 8 7C10 3 14 6 13 10C12 14 8 15 7 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>;
}

function OurStory() {
  const stageRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const stage = stageRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let current = 0;
    let target = 0;
    let lastTime = 0;

    const render = time => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      // Follow the scroll with a soft catch-up, including on large wheel steps.
      current += (target - current) * (1 - Math.exp(-elapsed / 115));
      if (reducedMotion.matches || Math.abs(target - current) < .0001) current = target;
      const progress = current * current * (3 - 2 * current);
      const spread = 1 - Math.pow(1 - progress, 1.35);
      stage.style.setProperty('--expand', progress.toFixed(5));
      stage.style.setProperty('--spread', spread.toFixed(5));
      stage.style.setProperty('--details', Math.max(0, (progress - .65) / .35).toFixed(5));
      stage.dataset.expanded = String(progress > .92);
      stage.dataset.textVisible = String(progress > .72);
      setExpanded(progress > .92);
      if (current !== target) frame = requestAnimationFrame(render);
      else { frame = 0; lastTime = 0; }
    };
    const schedule = () => {
      const hero = stage.querySelector('.mind-hero');
      const distance = Math.max(1, stage.offsetHeight - hero.offsetHeight);
      target = Math.max(0, Math.min(1, -stage.getBoundingClientRect().top / distance));
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(stage);
    resizeObserver.observe(stage.querySelector('.mind-hero'));
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div className="motion-stage story-page" id="start" ref={stageRef}>
      <div className="scroll-snap-point scroll-snap-start" aria-hidden="true" />
      <div className="scroll-snap-point scroll-snap-end" aria-hidden="true" />
    <main className="mind-hero">

      <section className="opening-scene" aria-labelledby="hero-title">
        <div className="headline-scroll"><h1 id="hero-title"><span>The new</span><span>companion to</span><span>your mind</span></h1></div>
        <figure className="product" aria-label="Golden desert sand dunes">
          <div className="product-reveal">
          <img src="/desert-dunes.jpg" alt="Golden sand dunes with wind-sculpted ridges beneath a pale sky" fetchPriority="high" className="desert-image" />
          </div>
        </figure>
      </section>
      <section id="hotel-story" className="motion-details" aria-label="Motion story" inert={!expanded}>
        <p className="motion-label">Motion</p>
        <h2>When Fog and Wind Unite to<br />Shape the Ever-Changing<br />Desert Canvas</h2>
        <p className="motion-description">Across the endless expanse of the desert, wind traces delicate, shifting patterns across the sand. The dunes move slowly, shaped by invisible currents, their golden ridges catching the light. Here, stillness is only an illusion; every grain is part of a landscape in motion.</p>
      </section>
      <footer className="motion-footer" inert={!expanded}>
        <a className="footer-symbol" href="#start" aria-label="Back to top"><MindMark /></a>
        <div><a href="/">Home</a><a href="#start">Collections</a><a href="#start">Contact</a><a href="#start">About</a></div>
        <span>&copy; Barli Hotel 2026</span>
      </footer>
      <div className="corner-note"><span />Made for a clearer mind</div>
    </main>
    </div>
  );
}

const routeFor = pathname => /^\/rooms-and-suites\/?$/.test(pathname) ? 'rooms' : /^\/our-story\/?$/.test(pathname) ? 'story' : pathname === '/' ? 'home' : '404';

function App() {
  const [page, setPage] = React.useState(() => routeFor(window.location.pathname));
  const pageRef = React.useRef(page);
  const transitionRef = React.useRef(null);
  const navigateRef = React.useRef(null);
  const headerAction = React.useCallback(() => {
    if (pageRef.current !== 'home') navigateRef.current?.(new URL('/#booking', window.location.origin), true);
    requestAnimationFrame(() => window.dispatchEvent(new Event('barli:open-booking')));
  }, []);

  React.useEffect(() => {
    document.title = page === '404' ? 'Page Not Found | Barli Hotel' : page === 'rooms' ? 'Rooms & Suites | Barli Hotel' : page === 'story' ? 'Our Story | Barli Hotel' : 'Barli Hotel | Experience Unparalleled Luxury';
  }, [page]);

  React.useEffect(() => {
    const navigate = (url, push) => {
      const next = routeFor(url.pathname);
      if (next === pageRef.current) return;
      transitionRef.current?.skipTransition();
      document.documentElement.dataset.navigation = ['home', 'rooms', 'story'].indexOf(next) > ['home', 'rooms', 'story'].indexOf(pageRef.current) ? 'forward' : 'back';
      const update = () => {
        if (push) window.history.pushState(null, '', url.pathname + url.search + url.hash);
        pageRef.current = next;
        flushSync(() => setPage(next));
        if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: 'instant', block: 'center' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      };
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        transitionRef.current = document.startViewTransition(update);
      } else update();
    };
    navigateRef.current = navigate;
    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || !/^\/(?:(?:our-story|rooms-and-suites)\/?)?$/.test(url.pathname)) return;
      if (routeFor(url.pathname) === pageRef.current) return;
      event.preventDefault();
      navigate(url, true);
    };
    const onPopState = () => navigate(new URL(window.location.href), false);
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return <div className="app-shell"><SiteHeader activePage={page} onAction={headerAction} />{page === 'story' ? <OurStory /> : page === 'rooms' ? <RoomsPage /> : page === 'home' ? <Home /> : <ErrorPage withHeader={false} />}</div>;
}

createRoot(document.getElementById('root')).render(<ErrorBoundary><App /></ErrorBoundary>);
