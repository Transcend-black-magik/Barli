import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './styles/site.css';
import App from './app/App.jsx';
import ErrorBoundary from './components/feedback/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(<ErrorBoundary><App /></ErrorBoundary>);
