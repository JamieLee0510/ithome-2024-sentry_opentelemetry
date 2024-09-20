const { config } = require('dotenv');

config();

module.exports = {
    SENTRY_DSN: process.env.SENTRY_DSN,
    PORT: 3030,
};
