import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import {
    Routes,
    Route,
    BrowserRouter,
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
    Link,
    Outlet,
} from 'react-router-dom';

import { SENTRY_ENDPOINT } from './config';
import Page01 from './features/Page01';
import Page02 from './features/Page02';
import Page03 from './features/Page03';

import './App.css';
import Home from './features/Home';

Sentry.init({
    dsn: SENTRY_ENDPOINT,
    integrations: [
        // See docs for support of different versions of variation of react router
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes,
        }),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
    return (
        <BrowserRouter>
            <SentryRoutes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="page01" element={<Page01 />} />
                    <Route path="page02" element={<Page02 />} />
                    <Route path="page03" element={<Page03 />} />
                </Route>
            </SentryRoutes>
        </BrowserRouter>
    );
}

function Layout({ children }) {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>&nbsp;|&nbsp;
                <Link to="/page01">Page01</Link>&nbsp;|&nbsp;
                <Link to="/page02">Page02</Link>&nbsp;|&nbsp;
                <Link to="/page03">Page03</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default App;
