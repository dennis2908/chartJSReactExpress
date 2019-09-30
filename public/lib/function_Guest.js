         var vm = new Vue({
            el: '#Table_01',
            data: {
            },
            methods : {
               change_image : function(zone,arr=[]) {
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
				  } 
               }
            }
         });