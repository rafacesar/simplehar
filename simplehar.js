jQuery.create = function(e) {return $(document.createElement(e));};

(function(har, w, doc, $) {
	'use strict';
	$('title').text($('title').text() + ' - ' + har.pages[0].title);
	
	var $container = $('.container'),
		url, filename, params;
	
	
	
	
	for(var i=0;i<har.entries.length;i++) {
		url = har.entries[i].request.url.split('/');
		filename = url[url.length - 1];
		filename = filename.split('#')[0].split('?')[0];
		
		$.create('li')
			.addClass('clearfix')
			.append(
				$.create('a')
				.html(har.entries[i].request.method + ' ' + filename + '<em>' + url[url.length - 1].substr(filename.length) + '</em>')
			)
			.append(
				$.create('strong')
				.text(url.join('/'))
			)
			.append(
				$.create('span')
				.addClass('status')
				.text(har.entries[i].response.status + ' ' + har.entries[i].response.statusText)
			)
			.append(
				$.create('span')
				.addClass('size')
				.text(har.entries[i].response.bodySize)
			)
			.appendTo($container);
	}
	
	
	
})(har.log, window, document, jQuery);