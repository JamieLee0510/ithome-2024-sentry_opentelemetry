import InOrderError from './components/InOrderError';
import './App.css';
import { useRef } from 'react';
import { SelfDomInstrument } from './self-instrument-dom';

const selfDomInstrument = new SelfDomInstrument();
selfDomInstrument.initEventMonintoring();

function App() {
    const demoRef = useRef();
    const demo = () => {
        const userActions = selfDomInstrument.userActions;
        console.log(userActions);
    };
    return (
        <div id="app-root">
            <InOrderError />
            <div id="demo-wrap" onClick={() => demo()}>
                <div ref={demoRef} id="demo-dom">
                    Hello World
                </div>
            </div>
        </div>
    );
}

export default App;
