function load_body(zone_id){
	  
	$.ajax({
	method: "GET",	
    url:"/crud/get_by_id", 
    data: { id: zone,author: "guest"},
    success:function(data) {
		if(data)
		{
			$('#table_1').html(data);
		}
			
	  }
	}).done(function( data ) {
		      $('img,div').each(function () {

				var arrx = ['green','blue','red','green-dragging','red-dragging','blue-dragging','green ui-draggable-dragging','red ui-draggable-dragging'
				,'red ui-draggable-dragging'];
				var arry = ['border_red rectangle','border_green rectangle','border_blue rectangle'];
				var arrz = ['merge'];
				var i = $(this).attr('class');
				
			    if(i)
				{
 				  if(i.includes('ui-draggable'))
				  {
					$(this).attr('class',$(this).attr('class').replace(' ui-draggable',''));
				  }
				}
				if(i)
				{
				  if(i.includes('-dragging'))
				  {
					$(this).attr('class',$(this).attr('class').replace('-dragging',''));
				  }
				}
				
				var i = $(this).attr('class');
				
				if(arrx.includes(i))
				{
				
					$(this).mouseover(function(){
						timerS(5);
					});
				}
				
				
				if(arry.includes(i))
				{
					$(this).click(function() {
						if($(this).attr('class')=="border_blue rectangle ui-draggable")
						{
									
						   $(this).attr('class','border_red rectangle ui-draggable');
										  
						}
						else if($(this).attr('class')=="border_green rectangle ui-draggable")
						{
									
						   $(this).attr('class','border_blue rectangle ui-draggable');
										  
						}
						else{
						  
						   $(this).attr('class','border_green rectangle ui-draggable');
						}	

						timerS(5);
  						
						
					});
					$(this).draggable();
				}
			
			});

	});
}

function save_body(zone_id,zone_to){
	
if(!zone_id)
{
	zone_id=zone;
}	
	$.ajax({
        url: "/crud/save",
        type: "post",
        data: {	
			body: $('#table_1').html(),
			id: zone_id
		} ,
        success: function (response) {
			if(!zone_to)
			{
				zone_to = "zone"+zone_id+"_only";
			}

		    var loc = window.location;
				 
		    window.location.href = "/"+zone_to;
			
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
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
				  
				  timerS(5);
        
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
			
			timerS(5);


}

function change_color_dm(arr=[],arr_table_type=[]){
	
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
		   
		   timerS(5);
   
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