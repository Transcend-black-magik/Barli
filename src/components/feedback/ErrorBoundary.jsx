import React from 'react';
import ErrorPage from '../../pages/errors/ErrorPage.jsx';

export default class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <ErrorPage code="500" onRetry={() => window.location.reload()} /> : this.props.children; }
}
