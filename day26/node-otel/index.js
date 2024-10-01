require('./utils/otel');

const express = require('express');
const cors = require('cors');

const { pgClient } = require('./utils/pg');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'hello nodejs opentelemetry' });
});

app.get('/api/demo-trace', async (req, res) => {
    const pgResult = await pgClient.query('SELECT pg_sleep(5);'); // 模擬 5 秒的耗時操作
    res.json({ message: 'demo api successfully' });
});

app.listen(PORT, () => {
    console.log(`monitor server running on: http://localhost:${PORT}`);
});
