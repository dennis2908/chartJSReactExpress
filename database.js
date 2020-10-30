var pg = require('pg')
var config = {
  user: 'wkijhdswmbdagm',
  host: 'ec2-52-203-165-126.compute-1.amazonaws.com',
  database: 'd55elu3a9h380s',
  password: '3ac0c112c759a5e8bc233b5600f8ffce292df608a4e7b34822f5a46fb13ceddd',
  port: 5432,
  ssl: {
      rejectUnauthorized: false
    }
}
var pool = new pg.Pool(config);
module.exports = pool;