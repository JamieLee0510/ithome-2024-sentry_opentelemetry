const express = require('express');
const cors = require('cors');

const { SelfSentry } = require('./self-sentry');

const app = express();
const PORT = 3060;

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello self error catcher');
});

app.get('/demo-error', (req, res) => {
    throw new Error('---Mock Error');
});

SelfSentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`);
});
