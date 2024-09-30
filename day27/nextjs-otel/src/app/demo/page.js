'use client';
import React from 'react';

export default function Demo() {
    const clickHandler = async () => {
        const res = await fetch('/api/demo', { method: 'GET' });
        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <h1>Demo Page</h1>
            <button onClick={() => clickHandler()}>demo api</button>
        </div>
    );
}
