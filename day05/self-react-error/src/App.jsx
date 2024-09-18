import './App.css';
import { selfSentry } from './demo';
selfSentry.init();

function App() {
    const throwCommonError = () => {
        throw new Error('---error throw by myself');
    };
    const throwPromiseError = async () => {
        const mockPromise = () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('---promise error by myself');
                }, 500);
            });

        await mockPromise();
    };
    return (
        <div>
            <button onClick={() => throwCommonError()}>throw error</button>
            <button onClick={() => throwPromiseError()}>
                throw promise error
            </button>
        </div>
    );
}

export default App;
