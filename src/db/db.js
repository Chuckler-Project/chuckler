const { Pool } = require('pg');

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: DB_URL });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
