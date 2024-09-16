import React, { useEffect, useState } from 'react';

export default function InOrderError() {
    const [clickFlow, setClickFlow] = useState({
        first: false,
        second: false,
        third: false,
    });
    const clickHandler = (flag) => {
        const { first, second, third } = clickFlow;
        switch (flag) {
            case 'first':
                setClickFlow((pre) => ({ ...pre, first: !first }));
                break;
            case 'second':
                setClickFlow((pre) => ({ ...pre, second: !second }));
                break;
            case 'third':
                // if (!first || !second) {
                //     alert('Click Flow Error');
                //     throw new Error('Click Flow Error');
                // }
                setClickFlow((pre) => ({ ...pre, third: !third }));
                break;
        }
    };

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
