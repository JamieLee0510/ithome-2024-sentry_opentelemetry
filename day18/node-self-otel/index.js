// const { demoStart } = require('./utils/demo');
// demoStart();
const MyTracingSDK = require('./utils/self-otel/sdk');
const sdk = new MyTracingSDK();
sdk.start();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3030;

// app.use((req, res, next) => {
//     if (!req.headers['traceparent']) {
//         req.headers['traceparent'] = 'hello traceparent';
//     }
//     console.log('---req headers: ', req.headers);
//     next();
// });
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server');
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});
