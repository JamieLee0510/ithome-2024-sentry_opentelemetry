const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'node-demo-service',
});

module.exports = {
    logger,
};
