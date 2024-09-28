const { selfSdk } = require('./otel/sdk');
selfSdk.start();

const express = require('express');
const cors = require('cors');
const { PORT } = require('./utils/config');
const { logger } = require('./utils/log');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    logger.info('hihi log');
    res.send('hello server');
});

app.get('/demo', async (req, res) => {
    logger.info('start /demo api');
    await sleep(1500);
    logger.warn('wair for a while');
    await sleep(1800);
    logger.warn('wair a little bit longer');
    await sleep(2000);
    logger.info('success');
    res.json({ message: 'hello nodejs opentelemetry' });
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});
