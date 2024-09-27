// const { demoStart } = require('./utils/demo');
// demoStart();
const MyTracingSDK = require('./utils/self-otel/sdk');
const sdk = new MyTracingSDK();
sdk.start();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { PYTHON_SERVICE_URL } = require('./utils/config');

const app = express();
const PORT = 3030;

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server');
});

app.get('/demo', async (req, res) => {
    const data = await axios.get(`${PYTHON_SERVICE_URL}/api/demo-01`);
    res.send('demo success');
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});
