$(function($) {
	$('.container').load('tableTemplate.html table');
	
	window.module = {};
	
	$(document.createElement('script')).attr('src','harToHtml.js').appendTo($('body'));
	
	
	
	
	var runHar = function(har) {
		window.har = har;
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
			$('tfoot tr').html(newHar.info);
		});
		
	};
	
	$('body').on('dragover', function(evt) {
		return false;
	}).on('dragend', function(evt) {
		return false;
	});
	
	$('body').one('drop', function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		
		var file = evt.originalEvent.dataTransfer.files[0],
			reader = new FileReader();
		reader.onload = function (evt) {
			var har;
			try {
				har = JSON.parse(evt.target.result);
			}
			catch(e) {
				alert('Arquivo fora do formato JSON');
				return;
			}
			
			runHar(har);
		};
		reader.readAsText(file);
		
		
		return false;
	});
	
	
});