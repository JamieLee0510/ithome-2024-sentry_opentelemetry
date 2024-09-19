import { Routes, Route, BrowserRouter, Link, Outlet } from 'react-router-dom';

import './App.css';
import { SelfSentry } from './self-sentry';
import Page01 from './features/Page01';
import Page02 from './features/Page02';
import Page03 from './features/Page03';

const SelfSentryRoutes = SelfSentry.withSentryReactRouter(Routes);

function App() {
    return (
        <BrowserRouter>
            <SelfSentryRoutes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<div>Home</div>} />
                    <Route path="page01" element={<Page01 />} />
                    <Route path="page02" element={<Page02 />} />
                    <Route path="page03" element={<Page03 />} />
                </Route>
            </SelfSentryRoutes>
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
