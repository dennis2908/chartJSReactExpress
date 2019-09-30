         var vm = new Vue({
            el: '#Table_01',
            data: {
            },
            methods : {
               change_image : function(zone,arr=[]) {
				   
				   console.log(arr);
                  for (i = 0; i < arr.length; i++) {
					if(document.getElementById(arr[i]).className  == "blue")
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_red.jpg"; 
							document.getElementById(arr[i]).className  = "red";
					}
					else if(document.getElementById(arr[i]).className  == "green")
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_blue.jpg"; 
							document.getElementById(arr[i]).className  = "blue";
					}
					else
					{
							document.getElementById(arr[i]).src = "/"+zone+"/images/"+arr[i]+"_green.jpg"; 
							document.getElementById(arr[i]).className  = "green";
					}
				  } 
               }
            }
         });