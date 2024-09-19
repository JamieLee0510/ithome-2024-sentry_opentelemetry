import React, { useState, useEffect } from 'react';

export default function InOrderError() {
    const [clickFlow, setClickFlow] = useState({
        first: false,
        second: false,
        third: false,
    });
    const clickHandler = (flag) => {
        const preBoolean = clickFlow[flag];

        setClickFlow((pre) => ({ ...pre, [flag]: !preBoolean }));
    };

    useEffect(() => {
        const { first, second, third } = clickFlow;
        if (first && second && third) {
            alert('throw Click-Flow-Error');
            throw new Error('Click-Flow-Error');
        }
    }, [clickFlow]);

    return (
        <div>
            <h1>InOrderError</h1>
            {Object.keys(clickFlow).map((flag) => (
                <button key={flag} onClick={() => clickHandler(flag)}>
                    {flag}+{clickFlow[flag] ? 'good' : 'bad'}
                </button>
            ))}
        </div>
    );
}
