require('./utils/otel');

const express = require('express');
const cors = require('cors');

const { logger } = require('./utils/log');
const { sleep } = require('./utils/func');
const { pgClient } = require('./utils/pg');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'hello nodejs opentelemetry' });
});

app.get('/demo-log', async (req, res) => {
    logger.info('start /demo api');
    await sleep(1500);
    logger.warn('wair for a while');
    await sleep(1800);
    logger.warn('wair a little bit longer');
    await sleep(2000);
    logger.info('success');
    res.json({ message: 'hello nodejs opentelemetry' });
});

app.get('/demo-trace', async (req, res) => {
    const pgResult = await pgClient.query('SELECT pg_sleep(5);'); // 模擬 5 秒的耗時操作
    res.json({ message: 'demo api successfully' });
});

app.listen(PORT, () => {
    console.log(`monitor server running on: http://localhost:${PORT}`);
});
