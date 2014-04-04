$(function($) {
	var waiting = function() {
		if(!$('.inside').length)
			return setTimeout(waiting, 1000);
		$('.inside').addClass('hidden');
		$('.inside .nav li:first-child').addClass('active');
	};
	waiting();
});