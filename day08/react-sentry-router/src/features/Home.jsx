import React from 'react';

export default function Home() {
    const clickHandler = () => {
        console.log('hihi');
    };
    const demoFetch = async () => {
        const url = 'https://example.org/products.json';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <div>
            <h1>Home</h1>
            <button onClick={clickHandler}>click action</button>
            <button onClick={() => demoFetch()}>demo fetch</button>
        </div>
    );
}
