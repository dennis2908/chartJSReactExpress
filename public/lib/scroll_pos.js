console.log(localStorage['position']);

if(localStorage['position'])
{
  $(window).scrollTop(localStorage['position']);	
}