const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const { SENTRY_DSN, PORT } = require('./config');

// Ensure to call this before requiring any other modules!
Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
        // Add our Profiling integration
        nodeProfilingIntegration(),
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
const { sleep } = require('./utils');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello nodejs with sentry');
});

app.get('/demo-01', (req, res) => {
    res.json({ message: 'demo api successfully' });
});

app.get('/demo-error', (req, res) => {
    throw new Error('Demo Error');
});

app.get('/demo-long', async (req, res) => {
    await sleep(3000);
    res.json({ message: 'demo api successfully' });
});

app.get('/demo-mulit-with-span', async (req, res) => {
    try {
        const dbResult = await Sentry.startSpan(
            {
                name: 'Mock DB Action',
            },
            async () => {
                // mock db
                await sleep(3000);
                return 'finsh db';
            },
        );
        const otherResult = await Sentry.startSpan(
            {
                name: 'Mock Other Service Action',
            },
            async () => {
                // mock db
                await sleep(2000);
                return 'finsh other service';
            },
        );

        res.json({ message: 'finish multi-action ' });
    } catch (err) {
        Sentry.captureException(err);
        res.status(500).send('Error Happened');
    }
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`NodeJS server in: http://localhost:${PORT}`);
});
