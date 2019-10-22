const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
 // Single Profile View
// Profile list Export

exports.get_by_id = function(req, res){

  var id = req.query.id;
   req.getConnection(function(err, connection){
    connection.query("select body from zone WHERE zone_id = ? ", [id], function(err, rows){	
	
	connection.query("UPDATE zone set sync = 1 WHERE zone_id = ?", [data, id], function(err, row){
			  
	});
	
	if(rows){
		if(rows.length > 0)
		{
		  return res.send(rows[0]['body']);	
		}
		else
		{
			return "";
		}
	}	
    });
  });
};

exports.save = function(req, res){

	
	var id = JSON.parse(JSON.stringify(req.body.id));
  
  console.log(id);
   req.getConnection(function(err, connection){
	  
	  var query = connection.query("select * from zone WHERE zone_id = "+id+" and sync = 1", function(err, rows){
		  
		var data = {
		  zone_id : JSON.parse(JSON.stringify(req.body.id)),	
		  body: JSON.parse(JSON.stringify(req.body.body))
		};	  
	  //return console.log(rows);
	  if(rows){
		  if(rows.length == 1)
			  connection.query("UPDATE zone set ? WHERE zone_id = ?", [data, id], function(err, row){
			  if(err)
				 res.send(['Zone is not synchronized']);
			  else
				 res.send("");  
			  
			});
		  else	
			req.getConnection(function(err, connection){
			var query = connection.query("INSERT INTO zone set ?", data, function(err, rows, fields){
				if(err)
				  res.send(['Zone is not synchronized']);
				else
				  res.send("");      
			});
		  });
	  }
	  else
	  {
		  res.send(['Zone is not synchronized']);
	  }
	  
	})})
};