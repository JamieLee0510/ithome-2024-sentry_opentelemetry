import React from 'react';

const mockArr = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function LongLoading() {
    return (
        <div>
            <h1>LongLoading</h1>
            <ul>
                {mockArr.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
