const Sentry = require('@sentry/node');
const axios = require('axios');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const { SENTRY_DSN, PORT, PYTHON_SERVICE_URL } = require('./utils/config');

// Ensure to call this before requiring any other modules!
Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
        // Add our Profiling integration
        nodeProfilingIntegration(),
        Sentry.postgresIntegration(),
    ],

    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});

const express = require('express');
const cors = require('cors');
const { pgClient } = require('./utils/pg');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello nodejs with sentry');
});

app.get('/demo', async (req, res) => {
    const reqHeader = req.headers;
    console.log(reqHeader);
    const pyResult = await axios.get(`${PYTHON_SERVICE_URL}/python-api`);
    const pgResult = await pgClient.query('SELECT pg_sleep(5);'); // 模擬 5 秒的耗時操作
    res.json({ message: 'demo api successfully' });
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`NodeJS server in: http://localhost:${PORT}`);
});
