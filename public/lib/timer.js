localStorage['item'] = 10;

timerW();

function timerW()
{
	var interval_to_save = setInterval(function () {
    localStorage['item']--;
    console.log(localStorage['item']);
    if (localStorage['item'] == 0) {
		localStorage['position'] = $(window).scrollTop();
	//	localStorage.clear();
	///	localStorage.removeItem('item');
		clearInterval(interval_to_save);
		window.location.reload(); 
    }
}, 1000);
}

function timerS(timer_to)
{
	localStorage['count_to_save'] = timer_to;
	var interval_to_reload = setInterval(function () {
	console.log(localStorage['count_to_save']);
    localStorage['count_to_save']--;
    if (localStorage['count_to_save'] == 0) {
	//	localStorage.clear();
	///	localStorage.removeItem('item');
	    save_body();
		clearInterval(interval_to_reload);

    }
}, 1000);
}