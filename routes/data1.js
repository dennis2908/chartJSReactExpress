var express = require('express');
var router = express.Router();

express.get('/', function (req, res) {
  // this is where you handle the POST request.
   // now the createStudent is an object you can use in your database insert logic.
   connection.query("SELECT bulan,hasil_penjualan FROM penjualan WHERE tahun='2016' order by id asc", function (err, resp) {
     if (err) throw err;
     // if there are no errors send an OK message.
     res.send(resp);
   });
 });
	
module.exports = router;