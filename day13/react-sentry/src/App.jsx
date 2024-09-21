import React, { useState } from 'react';
import { NODEJS_SERVICE_URL } from './config';
import './App.css';

function App() {
    const [isFetching, setIsFetching] = useState(false);
    const clickHandler = async () => {
        setIsFetching(true);
        const url = `${NODEJS_SERVICE_URL}/demo`;
        try {
            const res = await fetch(url, { method: 'GET' });
            const data = await res.json();
            alert('Fetch Successfully');
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    };
    return (
        <div>
            <h1>Hello Sentry</h1>
            {!isFetching ? (
                <button onClick={() => clickHandler()}>
                    Call NodeJS Service
                </button>
            ) : (
                <div>is fetching...</div>
            )}
        </div>
    );
}

export default App;
