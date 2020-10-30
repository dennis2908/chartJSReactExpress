var pg = require('pg');
var config = {
  user: 'postgres',
  host: 'localhost',
  database: 'penjualan',
  password: '12345',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 
}
var pool = new pg.Pool(config);
module.exports = pool;