import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import './styles.css';
import './home.css';
import Home from './Home.jsx';
import RoomsPage from './RoomsPage.jsx';
import OurStory from './OurStory.jsx';
import ErrorBoundary, { ErrorPage } from './ErrorPage.jsx';
import SiteHeader from './SiteHeader.jsx';

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
        document.documentElement.dataset.routeTransition = 'pending';
        const transition = document.startViewTransition(update);
        transitionRef.current = transition;
        const finish = () => {
          if (transitionRef.current !== transition) return;
          delete document.documentElement.dataset.routeTransition;
          window.dispatchEvent(new Event('barli:page-ready'));
        };
        transition.finished.then(finish, finish);
      } else {
        transitionRef.current = null;
        delete document.documentElement.dataset.routeTransition;
        update();
        window.dispatchEvent(new Event('barli:page-ready'));
      }
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
