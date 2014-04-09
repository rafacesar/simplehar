window.module = {};
(function(d,s) {
	(s = d.createElement('script')).src = 'harParser.js';
	s.id = 'harParser';
	d.body.appendChild(s);
})(document);
$(function($) {
	var stop;
	if(~navigator.userAgent.indexOf('Chrome') && location.href.indexOf('file:') === 0) {
		$(document.createElement('p')).css({
			width:'100%',
			height:'100%',
			position:'absolute',
			left:0,
			top:0,
			textAlign:'center',
			verticalAlign:'middle',
			display:'table-cell',
			backgroundColor:'rgba(0,255,255,0.5)'
		}).text('Chrome + Ajax + Local = :(').appendTo(document.body);
	}
	$('.container').load('template.html table');
	
	
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
			
			
			addInteraction($);
		});
		
	};
	
	$('body').on('dragover', function(evt) {
		return false;
	}).on('dragend', function(evt) {
		return false;
	});
	
	$('body').on('drop', function(evt) {
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