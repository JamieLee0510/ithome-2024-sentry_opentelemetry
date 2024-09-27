// const { otelSdk } = require('./utils/otel');
// otelSdk.start();
require('./utils/otel');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'hello nodejs opentelemetry' });
});

app.listen(PORT, () => {
    console.log(`monitor server running on: http://localhost:${PORT}`);
});
