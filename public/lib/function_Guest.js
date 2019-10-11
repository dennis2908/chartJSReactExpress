function load_body(zone_id){
	  
	$.ajax({
	method: "GET",	
    url:"crud/get_by_id", 
    data: { id: zone_id},
    success:function(data) {
		$('#table_1').html(data);
	  }
	});
}

load_body(zone);


function change_image(zone,arr=[]){				   
		          for (i = 0; i < arr.length; i++) {
					if(document.getElementById(arr[i]).className  == "green")
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_red.jpg"; 
							document.getElementById(arr[i]).className  = "red";
					}
					else
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_green.jpg"; 
							document.getElementById(arr[i]).className  = "green";
					}
							var container = document.querySelector("#"+arr[i]);
				  } 
        
}




	