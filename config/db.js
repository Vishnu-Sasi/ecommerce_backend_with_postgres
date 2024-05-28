const { Pool } = require('pg');

const pool = new Pool({
    user: 'trainingdb_user',
    password: 'upcodedb',
    host: 'localhost',
    port: 5432, 
    database: 'postgressql_ecommerce'
});

module.exports = pool;