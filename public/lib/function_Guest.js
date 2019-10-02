function save_body(zonename){
	alert('Save Zone');
	localStorage[zonename] = $('#table_1').html();
}

function load_body(zonename){
  $('#table_1').html(localStorage[zonename]);
}

load_body(zone);