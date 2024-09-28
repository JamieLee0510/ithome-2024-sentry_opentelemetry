const { config } = require('dotenv');
config();

module.exports = {
    PORT: 3031,
    PYTHON_SERVICE_URL: 'http://localhost:3040',
};
