$('img').each(function () {
            var i = $(this).attr('class');
			if(i=="green")
			{
				var j = $(this).attr('id');
				console.log(j);
				
				$('#'+j).draggable();
			}
			
});