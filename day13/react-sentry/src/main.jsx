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
Headers({
    accept: 'application/json, text/plain, */*',
    'user-agent': 'axios/1.7.7',
    'accept-encoding': 'gzip, compress, deflate, br',
    'sentry-trace': '282bec999ac14ac88f92c7c4bfa41f16-83a9c1fa172aa41d-1',
    baggage:
        'sentry-environment=production,sentry-public_key=fdcf31e5f9b89c2086c878ba04caada9,sentry-trace_id=282bec999ac14ac88f92c7c4bfa41f16,sentry-sample_rate=1,sentry-sampled=true',
    host: 'localhost:3040',
    connection: 'keep-alive',
});
