import React from 'react';

export default function ErrorComponent() {
    const throwClickWError = () => {
        alert('throw Self-Click-Error');
        throw new Error(' Self-Click-Error');
    };
    return (
        <div>
            <h1>ErrorComponent</h1>
            <button onClick={() => throwClickWError()}>throw error</button>
        </div>
    );
}
