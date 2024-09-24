const { config } = require('dotenv');

config();

module.exports = {
    PYTHON_SERVICE_URL: process.env.PYTHON_SERVICE_URL,
};
