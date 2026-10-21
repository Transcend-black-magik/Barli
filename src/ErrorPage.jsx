import React from 'react';
import SiteHeader from './SiteHeader.jsx';
export function ErrorPage({ code = '404', onRetry }) {
  return <div className="error-page"><SiteHeader onAction={() => { window.location.href = '/#booking'; }} /><main><p className="rooms-eyebrow">BARLI HOTEL</p><span className="error-code" aria-hidden="true">{code}</span><h1>{code === '404' ? 'A little off the beaten path.' : 'Let\u2019s get your stay back on track.'}</h1><p>{code === '404' ? 'We couldn\u2019t find this page. Your next escape is still waiting.' : 'Something went wrong while loading this page. Please try again.'}</p><div><a href="/">Return home <span aria-hidden="true">&#8599;</span></a>{onRetry ? <button type="button" onClick={onRetry}>Try again</button> : <a className="error-secondary" href="/rooms-and-suites/">Explore rooms</a>}</div></main></div>;
}
export default class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <ErrorPage code="500" onRetry={() => window.location.reload()} /> : this.props.children; }
}
