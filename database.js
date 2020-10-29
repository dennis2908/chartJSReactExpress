var pg = require('pg')
var config = {
  user: 'wkijhdswmbdagm',
  host: 'localhost',
  database: 'd55elu3a9h380s',
  password: '3ac0c112c759a5e8bc233b5600f8ffce292df608a4e7b34822f5a46fb13ceddd',
  port: 5432
}

var pool = new pg.Pool(config);

module.exports = pool;