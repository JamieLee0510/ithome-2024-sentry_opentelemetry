import InOrderError from './components/InOrderError';
import './App.css';
import { useRef } from 'react';
import { SelfDomInstrument } from './self-instrument-dom';

const selfDomInstrument = new SelfDomInstrument();
selfDomInstrument.initEventMonintoring();

function App() {
    return (
        <div id="app-root">
            <div className="inorder-area">
                <InOrderError />
            </div>
        </div>
    );
}

export default App;
