const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
const express = require('express');
const app = express();
var async = require('async');

var q = require('q');

var deferred = q.defer(); // Use Q 
 // Single Profile View
// Profile list Export

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
	   
    connection.query(sql_script, function(err, rows){
		
		console.log(err);

		if(req.query.author=='guest')	{
			var sql_update = "UPDATE zone set "+req.query.author+"_sync = 0 WHERE zone_id = "+id;
		}
		else
		{
			var sql_update = "UPDATE zone set "+req.query.author+"_sync = 0";
		}
			
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

exports.save = function(req, res){

	
	var id = JSON.parse(JSON.stringify(req.body.id));
  						 
							 
   req.getConnection(function(err, connection){
	   if(id=='all')  
	   {  
        	get_query("select * from zone WHERE zone_id = 1 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body1)+' where zone_id = 1', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 1", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (1,'+JSON.stringify(req.body.body1)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });	
			 
			
			 get_query("select * from zone WHERE zone_id = 2 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body2)+' where zone_id = 2', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 2", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (2,'+JSON.stringify(req.body.body2)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
			 
			 get_query("select * from zone WHERE zone_id = 3 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body3)+' where zone_id = 3', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 3", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (3,'+JSON.stringify(req.body.body3)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
			 
			 var zone_id = 4;
			 
			 var body =  JSON.stringify(req.body.body4);
			
			 get_query("select * from zone WHERE zone_id = 4 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body4)+' where zone_id = 4', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 4", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (4,'+JSON.stringify(req.body.body4)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
			 
			
			 get_query("select * from zone WHERE zone_id = 5 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body5)+' where zone_id = 5', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 5", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (5,'+JSON.stringify(req.body.body5)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
			
			 get_query("select * from zone WHERE zone_id = 6 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body6)+' where zone_id = 6', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 6", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (6,'+JSON.stringify(req.body.body6)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
			 
			
			 get_query("select * from zone WHERE zone_id = 7 and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+JSON.stringify(req.body.body7)+' where zone_id = 7', function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = 7", function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values (7,'+JSON.stringify(req.body.body7)+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
			 

			res.send("");   
			
	   } 	   
	   else{
		   
		    zone_id=id;
			body = JSON.stringify(req.body.body);
			get_query("select * from zone WHERE zone_id = "+zone_id+" and admin_sync = 0 and guest_sync = 0", function(result){
				if(result){
					if(result.length == 1){
					  ins_sql('UPDATE zone set admin_sync = 1,guest_sync = 1,body = '+body+' where zone_id='+zone_id, function(result){
							console.log(result);	
							
					  });	
					}
					else
					{
					  get_query("select * from zone WHERE zone_id = "+zone_id, function(result){
                        if(result){
							if(result.length == 0){ 						  
								  ins_sql('insert into zone(zone_id,body) values ('+zone_id+','+body+')', function(result){
									console.log(result);			
										
								  });
							}
						}
					   })
	
					}
					
				}
			 });
	   }
	 
	  
	})
};

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