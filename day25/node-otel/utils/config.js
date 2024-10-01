const { config } = require('dotenv');

config();

module.exports = {
    POSTGRESQL_URL: process.env.POSTGRESQL_URL,
    // PYTHON_SERVICE_URL: 'http://localhost:3040',
    PORT: 3030,
};
