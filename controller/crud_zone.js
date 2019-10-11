const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
 // Single Profile View
// Profile list Export

exports.get_by_id = function(req, res){

  var id = req.query.id;
   req.getConnection(function(err, connection){
    connection.query("select body from zone WHERE zone_id = ? ", [id], function(err, rows){	
		if(rows.length > 0)
		{
		  return res.send(rows[0]['body']);	
		}
		else
		{
			return "";
		}
    });
  });
};

exports.save = function(req, res){

	
	var id = JSON.parse(JSON.stringify(req.body.id));
  
  //return console.log(input);
   req.getConnection(function(err, connection){
	  
	  var query = connection.query("select * from zone WHERE zone_id = "+id, function(err, rows){
		  
		var data = {
		  zone_id : JSON.parse(JSON.stringify(req.body.id)),	
		  body: JSON.parse(JSON.stringify(req.body.body))
		};	  
	  //return console.log(rows);
	  if(rows.length > 0)
		  connection.query("UPDATE zone set ? WHERE zone_id = ?", [data, id], function(err, row){
		  if(err)
			console.log("Error in Updating : %s", err);
		  else
			 res.send("");  
		  
		});
	  else	
		req.getConnection(function(err, connection){
		console.log(data);
		var query = connection.query("INSERT INTO zone set ?", data, function(err, rows, fields){
			if(err)
			  console.log("Error in Saving : %s", err);
			else
			  res.send("");      
		});
	  });
	})})
};

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
