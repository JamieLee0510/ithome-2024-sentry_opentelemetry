import * as Sentry from '@sentry/react';
import { SENTRY_ENDPOINT, NODEJS_SERVICE_URL } from './config';
Sentry.init({
    dsn: SENTRY_ENDPOINT,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.browserProfilingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    tracePropagationTargets: ['localhost', /^https:\/\/localhost:3030/],
});

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
