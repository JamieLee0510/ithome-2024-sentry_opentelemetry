const { config } = require('dotenv');

config();

module.exports = {
    PROMETHEUS_URL: process.env.PROMETHEUS_URL,
};
