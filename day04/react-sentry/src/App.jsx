import * as Sentry from '@sentry/react';
import React from 'react';
import { SENTRY_ENDPOINT } from './config';
import ErrorComponent from './components/ErrorComponent';
import InOrderError from './components/InOrderError';
import LongLoading from './components/LongLoading';
import './App.css';

Sentry.init({
    dsn: SENTRY_ENDPOINT,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.browserProfilingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

function App() {
    return (
        <div>
            <h1>Hello Sentry</h1>
            {/* <ErrorComponent /> */}
            {/* <InOrderError /> */}
            <LongLoading />
        </div>
    );
}

export default App;