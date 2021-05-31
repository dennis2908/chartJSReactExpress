const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
const express = require('express');
const app = express();
var async = require('async');

const format = require('pg-format');
const pool = require('../database.js');

exports.get_data1 = function(req, res){
   
   pool.connect(function (err, client, done) {
    client.query("SELECT bulan,hasil_penjualan FROM penjualan WHERE tahun='2016' order by id asc", function (err, result) {
      res.json(result.rows); 
    })
  }); 
   
};

exports.get_data2 = function(req, res){

  pool.connect(function (err, client, done) {
    client.query("SELECT student_id,student_name,marks FROM tbl_marks ORDER BY student_id", function (err, result) {
      res.json(result.rows); 
    })
  }); 
};