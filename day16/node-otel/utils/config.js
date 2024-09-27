const { config } = require('dotenv');

config();

module.exports = {
    JAEGER_URL: process.env.JAEGER_URL,
    PYTHON_SERVICE_URL: process.env.PYTHON_SERVICE_URL,
};
