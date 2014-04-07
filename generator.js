$(function($) {
	$('.container').load('tableTemplate.html table');
	
	window.module = {};
	
	$(document.createElement('script')).attr('src','harToHtml.js?a').appendTo($('body'));
	
	var harFile = location.href.split('?');
	if(harFile.length <= 1)
		return;
	
	harFile = harFile[1].match(/(?:^|&)har=([^&]+)/);
	if(!harFile || harFile.length != 2)
		return;
	
	$.get(harFile[1], function(har) {
		window.har = JSON.parse(har);
		window.newHar = module.exports(window.har, function(content) {
			var elm = document.createElement('span');
			elm.appendChild(document.createTextNode(content));
			return elm.innerHTML;
		});
		
		
		$.get('requestTemplate.html', function(template) {
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
			$('tfoot').find('td').last().html('<span class="domloaded" style="left:' + newHar.domLoadedPosition + '%;height:' + (31*ilen) + 'px"></span>');
		});
		
	});
	
	
	
	
	
	
	
});