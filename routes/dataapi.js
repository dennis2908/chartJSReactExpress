const express = require('express');
const router = express.Router();
const format = require('pg-format');
const pool = require('../database.js');


router.get('/', router.get(function(req, res, next) {
  pool.connect(function (err, client, done) {
    if (err) throw new Error(err);
    var ageQuery = format("SELECT bulan,hasil_penjualan FROM penjualan WHERE tahun='2016' order by id asc")
    client.query(ageQuery, function (err, result) {
      if (err) throw new Error(err);
      res.json(result.rows[0]); 
    })
  }); 
}));

module.exports = router;