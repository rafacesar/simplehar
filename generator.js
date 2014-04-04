$(function($) {
	$('.container').load('template.html table');
	
	window.module = {};
	
	$(document.createElement('script')).attr('src','harToHtml.js').appendTo($('body'));
	
	$.get('teste.har', function(har) {
		window.har = JSON.parse(har);
		window.newHar = module.exports(window.har);
		
		$.get('requestTemplate.html?b', function(template) {
			var html =  '',
				i = 0,
				ilen = newHar.entries.length,
				prop, nHar, _html;
			for(;i<ilen;i++) {
				nHar = newHar.entries[i];
				_html = template;
				for(prop in nHar) {
					_html = _html.replace(new RegExp('{' + prop + '}','g'), nHar[prop]);
				}
				html += _html;
			}
			$('tbody').html(html);
		});
		
	});
	
	
	
	
	
	
	
});