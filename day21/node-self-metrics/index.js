// const { demoStart } = require('./utils/demo');
// demoStart();
const SimpleHttpInstrumentation = require('./utils/demo');
const { MockMeter } = require('./utils/meter');
const meter = new MockMeter();
const httpInstrumentation = new SimpleHttpInstrumentation(meter);
httpInstrumentation.init();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3030;

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server');
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});
