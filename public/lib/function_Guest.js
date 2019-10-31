function load_body(zone_id){
	  
	$.ajax({
	method: "GET",	
    url:"/crud/get_by_id_Guest", 
    data: { id: zone,author: "guest"},
    success:function(data) {
		if(data)
		{
			$('#table_1').html(data);
		}
			
	  }
	})
}

function save_body(zone_id,zone_to){
	
if(!zone_id)
{
	zone_id=zone;
}	

var startTime = "";

setTimeout(function(){
	
	if (!startTime) {
        startTime = Date.now();
    }
	startTime = (Date.now() - startTime) / 1000;

    $.ajax({
        url: "/crud/save",
        type: "post",
        data: {	
			body: $('#table_1').html(),
			id: zone_id
		} ,
        success: function (response) {
			/*
			if(!zone_to)
			{
				zone_to = "zone"+zone_id+"_only";
			}

		    var loc = window.location;
				 
		    window.location.href = "/"+zone_to;
			
			*/
			
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
	
 }, 1000);
	
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

function reset_index(){					
		 $("img").css('z-index','1');
		 $("div").css('z-index','1');
		 alert('Z index Reset');
}	

function redirect_to(zoneto){
	  save_body(zone,zoneto);
} 		

function change_new_table_col(id=0,table_type=""){
  if($("#t"+id).attr('class')=="green")
			{

			   $("#t"+id).attr('class','red');
			   $("#t"+id).html('<img src="/images/'+table_type+'_red.jpg" width="78" height="68" alt="">'+id);


			}
			else{

			   $("#t"+id).attr('class','green');
			   $("#t"+id).html('<img src="/images/'+table_type+'_green.jpg" width="78" height="68" alt="">'+id);
			}
			
			


}

function change_color_dm(arr=[],arr_table_type=[]){
	
	var startTime = "";

setTimeout(function(){
	
	if (!startTime) {
        startTime = Date.now();
    }
	
	var id_div = arr.join('_');
    if($('#t'+id_div+'_merge').attr('class')=="green")
		   {
		      var div = "";
		      $('#t'+id_div+'_merge').attr('class','red');
		      for(i=0;i<arr.length;i++)
			  {
				div +='<div style="float:left;"><img class="'+arr_table_type[i]+'" src="/images/'+arr_table_type[i]+'_red.jpg" width="78" height="68" alt="">'+arr[i]+'</div>';
			  }
			  $('#t'+id_div+'_merge').html(div);
		   }
		   else
		   {
		      var div = "";
		      $('#t'+id_div+'_merge').attr('class','green');
		      for(i=0;i<arr.length;i++)
			  {
				div +='<div style="float:left;"><img class="'+arr_table_type[i]+'" src="/images/'+arr_table_type[i]+'_green.jpg" width="78" height="68" alt="">'+arr[i]+'</div>';
			  }
			  $('#t'+id_div+'_merge').html(div);
		   }
	startTime = (Date.now() - startTime) / 1000;	   
		   
 }, 1000);
		   
   
}
/*
localStorage['item'] = 10;

timerW();

function timerW()
{
	var interval = setInterval(function () {
	timer = localStorage['item'];
	console.log(timer);
    timer--;
    localStorage['item'] = timer;
    if (localStorage['item'] == 0) {
		localStorage['position'] = $(window).scrollTop();
	//	localStorage.clear();
	///	localStorage.removeItem('item');
		clearInterval(interval);
		save_body(zone);
    }
}, 1000);
}

*/