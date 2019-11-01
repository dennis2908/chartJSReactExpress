const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
const express = require('express');
const app = express();
var async = require('async');

var mysql = require('mysql');

exports.get_by_id = function(req, res){

  var id = req.query.id;
  if(id){
	  var sql_script = "select zone"+zone_id+" as zone1 from zone WHERE zone_id = "+id;
  }
  else
  {
	 var sql_script = "SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 1) ,'') AS body "; 
     sql_script += "UNION ALL SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 2) ,'') AS body "; 
	 sql_script += "UNION ALL SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 3) ,'') AS body "; 
	 sql_script += "UNION ALL SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 4) ,'') AS body "; 
	 sql_script += "UNION ALL SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 5) ,'') AS body ";
	 sql_script += "UNION ALL SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 6) ,'') AS body ";
	 sql_script += "UNION ALL SELECT IFNULL( (SELECT body FROM zone WHERE zone_id = 7) ,'') AS body";
  }
  req.getConnection(function(err, connection){
	  
   var mysql = require('mysql');

   var connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
	   port: 3306,
		database: 'etherus_zone'
   });
	   
    connection.query(sql_script, function(err, rows){
		
		//console.log(err);

		if(req.query.author=='guest')	{
			var sql_update = "UPDATE zone set "+req.query.author+"_sync = 0 WHERE zone_id = "+id;
		}
		else
		{
			var sql_update = "UPDATE zone set "+req.query.author+"_sync = 0";
		}
		var mysql = require('mysql');

	   var connection = mysql.createConnection({
		   host: "localhost",
		   user: "root",
		   password: "",
		   port: 3306,
			database: 'etherus_zone'
	   });
		connection.query(sql_update, function(err, row){
				
			//	console.log(req.query.author);
					  
		});
			
			
		if(rows){
				if(rows.length > 0)
				{
				  if(id){
					  return res.send(rows[0]['body']);	
				  }
				  else
				  {
					 return res.send(rows);	 
				  } 	
				  
				}
				else
				{
					return "";
				}
		}	
				
	});
  });
};


exports.get_by_id_Guest = function(req, res){

  var id = req.query.id;
  
   req.getConnection(function(err, connection){
   var mysql = require('mysql');
   
   var mysql = require('mysql');

    var connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
	   port: 3306,
		database: 'etherus_zone'
   });
	   
    connection.query("select body from zone WHERE zone_id = ? ", [id], function(err, rows){	
	
	var mysql = require('mysql');

    var connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
	   port: 3306,
		database: 'etherus_zone'
   });
	
	
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



exports.get_by_id_Admin = function(req, res){

  var id = req.query.id;
   req.getConnection(function(err, connection){
	var mysql = require('mysql');

		var connection = mysql.createConnection({
			   host: "localhost",
			   user: "root",
			   password: "",
			   port: 3306,
				database: 'etherus_zone'
		});
		
    connection.query("select body from zone WHERE zone_id = ? ", [id], function(err, rows){	
	
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
var zone_id = JSON.parse(JSON.stringify(req.body.id));
			body = JSON.stringify(req.body.body);
			get_query("select * from zone WHERE zone_id = "+JSON.parse(JSON.stringify(req.body.id))+" and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
						ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1, body = '+JSON.stringify(req.body.body)+' where zone_id='+JSON.parse(JSON.stringify(req.body.id)), function(result){
				 			return res.send("");	 
							
						});	
					  
					}
					else
					{
					   get_query("select * from zone WHERE zone_id = "+JSON.parse(JSON.stringify(req.body.id)), function(result){
							if(result){
								if(result.length == 0){ 						  
									  ins_sql('insert into zone(zone_id,body) values ('+JSON.parse(JSON.stringify(req.body.id))+','+JSON.stringify(req.body.body)+')', function(result){
										 return res.send("");	 
											
									  });
								}
								else{
									
									return res.send("");	
								}
							}
							
					  })
	
					}
					
				}
});
			 
}
	

exports.save_by_admin = function(req, res){

	
			var zone_id = JSON.parse(JSON.stringify(req.body.id));
			body = JSON.stringify(req.body.body);
			get_query("select * from zone WHERE zone_id = "+JSON.parse(JSON.stringify(req.body.id)), function(result){
				if(result){
					if(result.length == 1) {
                        ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1, body = '+JSON.stringify(req.body.body)+' where zone_id='+JSON.parse(JSON.stringify(req.body.id)), function(result){
                            //console.log(result);

                        });
                    }
					else
					{
					  ins_sql('insert into zone(zone_id,body) values ('+JSON.parse(JSON.stringify(req.body.id))+','+JSON.stringify(req.body.body)+')', function(result){
							//console.log(result);
					  });
	
					}
					
				}
			});
			 
	return res.send("");	 
}	

function get_query(sql,callback) {
	
	var mysql = require('mysql');

    var connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
	   port: 3306,
		database: 'etherus_zone'
   });
			var query = connection.query(sql, function(error, results, fields) {
				
				return callback(results);


			});
	
}


function ins_sql(sql,callback) {
	
	var mysql = require('mysql');

    var connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
	   port: 3306,
		database: 'etherus_zone'
   });
			var query = connection.query(sql,function(error, results, fields) {

			return callback(error);
				


			});
	
}