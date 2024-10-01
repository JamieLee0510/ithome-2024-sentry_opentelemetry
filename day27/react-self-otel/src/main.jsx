import { MockWebSdk } from './self-otel/sdk.js';
const sdk = new MockWebSdk();
sdk.start();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
