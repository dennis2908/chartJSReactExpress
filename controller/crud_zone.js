const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
 // Single Profile View
// Profile list Export

exports.get_by_id = function(req, res){

  var id = req.query.id;
   req.getConnection(function(err, connection){
    connection.query("select body from zone WHERE zone_id = ? ", [id], function(err, rows){	
	
	connection.query("UPDATE zone set "+req.query.author+"_sync = 0 WHERE zone_id = "+id, function(err, row){
		
	//	console.log(req.query.author);
			  
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
  
  //console.log(id);
   req.getConnection(function(err, connection){
	  
	  var query = connection.query("select * from zone WHERE zone_id = "+id+" and admin_sync = 0 and guest_sync = 0", function(err, rows){
		  
		var data = {
		  zone_id : JSON.parse(JSON.stringify(req.body.id)),	
		  body: JSON.parse(JSON.stringify(req.body.body)),
		  guest_sync : 1,
		  admin_sync : 1
		};	  
	  //return console.log(rows);
	  if(rows){
		  if(rows.length == 1)
			  connection.query("UPDATE zone set ? WHERE zone_id = ? and admin_sync = 0 and guest_sync = 0", [data, id], function(err, row){
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