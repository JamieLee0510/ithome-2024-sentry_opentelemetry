const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'node-self-logs',
});

module.exports = {
    logger,
};
