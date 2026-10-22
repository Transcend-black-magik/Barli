import React from 'react';
import { flushSync } from 'react-dom';
import Home from '../pages/home/HomePage.jsx';
import RoomsPage from '../pages/rooms-and-suites/RoomsPage.jsx';
import AboutPage from '../pages/about-us/AboutPage.jsx';
import ContactPage from '../pages/contact/ContactPage.jsx';
import RoomCategoryPage from '../pages/rooms-and-suites/category/RoomCategoryPage.jsx';
import RoomDetailsPage from '../pages/rooms-and-suites/details/RoomDetailsPage.jsx';
import ErrorPage from '../pages/errors/ErrorPage.jsx';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import { resolveRoute } from './routes.js';
import '../styles/page-reveals.css';

export default function App() {
  const [route, setRoute] = React.useState(() => resolveRoute(window.location.pathname));
  const routeRef = React.useRef(route);
  const transitionRef = React.useRef(null);
  const navigateRef = React.useRef(null);
  const scrollPositions = React.useRef(new Map());
  const position = React.useRef(Number(window.history.state?.barliPosition) || 0);
  const headerAction = React.useCallback(() => {
    if (routeRef.current.kind !== 'home') navigateRef.current?.(new URL('/#booking', window.location.origin), true);
    requestAnimationFrame(() => window.dispatchEvent(new Event('barli:open-booking')));
  }, []);
  React.useEffect(() => { document.title = route.title; }, [route]);
  React.useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.history.replaceState({ ...window.history.state, barliPosition: position.current }, '');
    const navigate = (url, push) => {
      const next = resolveRoute(url.pathname);
      const previous = routeRef.current;
      if (next.key === previous.key) return;
      transitionRef.current?.skipTransition();
      scrollPositions.current.set(previous.key, window.scrollY);
      const nextPosition = push ? position.current + 1 : Number(window.history.state?.barliPosition) || 0;
      const back = push ? next.rank < previous.rank : nextPosition < position.current;
      document.documentElement.dataset.navigation = back ? 'back' : 'forward';
      const isRoomJourney = ['rooms', 'category', 'room'].includes(previous.kind) && ['rooms', 'category', 'room'].includes(next.kind);
      if (isRoomJourney) document.documentElement.dataset.roomTransition = back ? 'close' : 'open';
      else delete document.documentElement.dataset.roomTransition;
      const update = () => {
        if (push) window.history.pushState({ barliPosition: nextPosition }, '', url.pathname + url.search + url.hash);
        position.current = nextPosition;
        routeRef.current = next;
        flushSync(() => setRoute(next));
        let target = null;
        try { target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null; } catch { /* Invalid hashes do not interrupt navigation. */ }
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
        else window.scrollTo({ top: !push ? scrollPositions.current.get(next.key) || 0 : 0, left: 0, behavior: 'instant' });
      };
      const finish = () => {
        delete document.documentElement.dataset.routeTransition;
        window.dispatchEvent(new Event('barli:page-ready'));
      };
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.dataset.routeTransition = 'pending';
        const transition = document.startViewTransition(update);
        transitionRef.current = transition;
        const complete = () => { if (transitionRef.current === transition) finish(); };
        transition.finished.then(complete, complete);
      } else { transitionRef.current = null; update(); finish(); }
    };
    navigateRef.current = navigate;
    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || resolveRoute(url.pathname).kind === '404') return;
      if (resolveRoute(url.pathname).key === routeRef.current.key) return;
      event.preventDefault(); navigate(url, true);
    };
    const onPopState = () => navigate(new URL(window.location.href), false);
    document.addEventListener('click', onClick); window.addEventListener('popstate', onPopState);
    return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', onPopState); window.history.scrollRestoration = previousRestoration; };
  }, []);
  const headerPage = ['rooms', 'category', 'room'].includes(route.kind) ? 'rooms' : route.kind === 'about' ? 'story' : route.kind;
  let page;
  switch (route.kind) {
    case 'home': page = <Home />; break;
    case 'rooms': page = <RoomsPage />; break;
    case 'category': page = <RoomCategoryPage key={route.key} category={route.category} />; break;
    case 'room': page = <RoomDetailsPage key={route.key} room={route.room} />; break;
    case 'about': page = <AboutPage />; break;
    case 'contact': page = <ContactPage />; break;
    default: page = <ErrorPage withHeader={false} />;
  }
  return <div className="app-shell"><SiteHeader activePage={headerPage} onAction={headerAction} />{page}</div>;
}
