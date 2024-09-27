const { otelSdk } = require('./utils/otel');
otelSdk.start();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { PYTHON_SERVICE_URL } = require('./utils/config');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'hello nodejs opentelemetry' });
});

app.get('/api/demo', (req, res) => {
    res.json({ message: 'demo api success' });
});

app.get('/api/demo-multi', async (req, res) => {
    const data = await axios.get(`${PYTHON_SERVICE_URL}/api/demo-01`);
    res.json({ message: `demo api success, python service: ${data.message}` });
});

app.listen(PORT, () => {
    console.log(`monitor server running on: http://localhost:${PORT}`);
});
