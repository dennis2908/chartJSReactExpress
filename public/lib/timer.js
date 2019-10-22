//localStorage.clear();

//localStorage.removeItem('item');

localStorage['item'] = 30;

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