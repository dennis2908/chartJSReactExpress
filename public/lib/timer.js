localStorage['item'] = 10;

timerW();

function timerW()
{
	var interval_to_save = setInterval(function () {
	var timer = localStorage['item'];
	console.log(timer);
    timer--;
    localStorage['item'] = timer;
    if (localStorage['item'] == 0) {
		localStorage['position'] = $(window).scrollTop();
	//	localStorage.clear();
	///	localStorage.removeItem('item');
		clearInterval(interval_to_save);
		window.location.reload(); 
    }
}, 1000);
}

function timerS(timer)
{
	localStorage['count_to_save'] = timer;
	var interval_to_reload = setInterval(function () {
	count_to_save = localStorage['count_to_save'];
	console.log(count_to_save);
    count_to_save--;
    localStorage['count_to_save'] = count_to_save;
    if (localStorage['count_to_save'] == 0) {
		localStorage['count_to_save'] = $(window).scrollTop();
	//	localStorage.clear();
	///	localStorage.removeItem('item');
	    save_body();
		clearInterval(interval_to_reload);

    }
}, 1000);
}