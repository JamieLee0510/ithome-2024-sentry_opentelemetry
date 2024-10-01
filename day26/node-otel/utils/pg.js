const { Client } = require('pg');
const { POSTGRESQL_URL } = require('./config');

const client = new Client({
    connectionString: POSTGRESQL_URL,
});

client.connect();
module.exports = {
    pgClient: client,
};
