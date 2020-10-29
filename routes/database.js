var pg = require('pg')
var config = {
  user: 'd55elu3a9h380s',
  host: 'ec2-52-203-165-126.compute-1.amazonaws.com',
  database: 'd55elu3a9h380s',
  password: '6d7fbb14581220e58426c74020a8e0341b1392bdf267df4eea74a0a9016a550f',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 
}

var pool = new pg.Pool(config);

module.exports = pool;