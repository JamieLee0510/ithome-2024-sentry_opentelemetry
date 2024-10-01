import React from 'react';
import axios from 'axios';
const NODE_SERVICE_URL = 'http://localhost:3030';

export default function Demo() {
    const demoFetch = async () => {
        const res = await fetch(`${NODE_SERVICE_URL}/api/demo-trace`);
        const data = await res.json();
        alert(data.message);
    };
    const demoAxios = async () => {
        const res = await axios.get(`${NODE_SERVICE_URL}/api/demo-trace`);
        alert(res.data.message);
    };
    return (
        <div>
            <h1>React + Otel</h1>
            <button onClick={() => demoFetch()}>test fetch</button>
            <button onClick={() => demoAxios()}>test axios</button>
        </div>
    );
}
