import { useState } from 'react';
import './App.css';
import SelfSentry from './self-sentry/index';

const DemoError = () => {
    throw new Error('Demo Component error');
};

function App() {
    const [shouldMount, setShouldMount] = useState(false);
    return (
        <SelfSentry.ErrorBoundary fallback={<div>Something Wrong</div>}>
            <div>
                {shouldMount && <DemoError />}
                <button onClick={() => setShouldMount((pre) => !pre)}>
                    mount DemoError Component
                </button>
            </div>
        </SelfSentry.ErrorBoundary>
    );
}

export default App;
