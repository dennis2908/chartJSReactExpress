var pg = require('pg')
var config = {
  user: 'postgres',
  host: 'localhost',
  database: 'arsenum',
  password: '12345',
  port: 5432,
  //ssl: {
     // rejectUnauthorized: false
  //  }
}
var pool = new pg.Pool(config);
module.exports = pool;