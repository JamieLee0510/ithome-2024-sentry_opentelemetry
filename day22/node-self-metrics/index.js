const { selfSdk } = require('./otel/sdk');
selfSdk.start();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { PORT, PYTHON_SERVICE_URL } = require('./utils/config');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server');
});

app.get('/demo', async (req, res) => {
    const data = await axios.get(`${PYTHON_SERVICE_URL}/api/demo-01`);
    res.send('hello server');
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});
