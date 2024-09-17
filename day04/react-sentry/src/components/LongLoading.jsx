import React, { useState, useEffect } from 'react';

const mockMaxNumber = 100000;
function performHeavyCalculation() {
    let total = 0;
    for (let i = 0; i < mockMaxNumber; i++) {
        total += i;
        console.log(total);
    }
}

export default function LongLoading() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        performHeavyCalculation();
        setIsReady(true);
    }, []);

    if (!isReady) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>LongLoading</h1>
            <ul>Completed Calculation</ul>
        </div>
    );
}
