window.module = {};
(function(d,s) {
	(s = d.createElement('script')).src = 'src/harParser.js';
	s.id = 'harParser';
	d.body.appendChild(s);
})(document);
$(function($) {
	$.getJSON('src/translate.json', function(data) {
		window.translations = data || false;
	});
	$.get('src/template.html', function() {
		$('.container').load('src/template.html table', function() {
			$('caption').html('');
			translateTemplate($('.har-table'));
		});
		
		
		$('body').on('dragover', function(evt) {
			var $drop = $('#drop');
			if($drop.length) {
				$drop.css('display', 'table');
			}
			else {
				$(document.createElement('div'))
				.attr('id', 'drop')
				.css({
					width:'100%',
					height:'100%',
					position:'absolute',
					left:0,
					top:0,
					border:'7px dashed #666',
					display:'table',
					textAlign:'center',
					backgroundColor:'rgba(0,0,0,.3)'
				})
				.append(
					$(document.createElement('span'))
					.text('Drop Here! :)')
					.css({
						color: '#EEE',
						display:'table-cell',
						'text-shadow': '2px 2px 5px #066',
						fontSize:'50px',
						verticalAlign:'middle'
					})
				)
				.appendTo(document.body);
			}
			$drop.data('hide','false');
			return false;
		}).on('dragend', function(evt) {
			return false;
		}).on('dragleave', function(evt) {
			var $drop = $('#drop');
			$drop.data('hide','true');
			setTimeout(function() {
				if($drop.data('hide') == 'true')
					$drop.css('display', 'none');
			}, 50);
			return false;
		}).on('drop', function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			
			var files = evt.originalEvent.dataTransfer.files;
			
			$('#drop').css('display', 'none');
			
			if(files.length) {
				
				if($('.loader').length)
					$('.loader').show();
				else
					$(document.createElement('div')).addClass('loader').appendTo(document.body);
			
			
				var file = files[0],
					reader = new FileReader();
				
				reader.onload = function (evt) {
					var har;
					try {
						har = JSON.parse(evt.target.result);
					}
					catch(e) {
						alert('Invalid JSON');
						$('.loader').hide();
						return;
					}
					$('tbody, tfoot tr, caption').html('');
					$('.tooltip, .popover').remove();
					
					
					runHar(har);
					
				};
				reader.readAsText(file);
			}
			
			return false;
		});
		
		
		
		
	}).fail(function() {
		$(document.createElement('p')).css({
			width:'100%',
			height:'100%',
			position:'absolute',
			left:0,
			top:0,
			textAlign:'center',
			verticalAlign:'middle',
			display:'table',
			backgroundColor:'rgba(0,255,255,0.5)'
		})
		.append(
			$(document.createElement('span'))
			.text('Local Ajax is not supported :(')
			.css({
				display:'table-cell',
				'text-shadow': '2px 2px 5px #333',
				fontSize:'50px',
				verticalAlign:'middle',
				color:'rgb(0,200,200)',
				fontWeight:'bold'
			})
		).appendTo(document.body);
		$('body').html($('body').html().replace('{content}', ''));
	});
	
	var translateTemplate = function($elm) {
		var html = $elm.html(),
			translations = window.translations,
			lng = navigator.language,
			replacer;
		if(translations && translations[lng]) {
			replacer = function(complete, match) {
				return (translations[lng][match]) || match;
			};
		}
		else if(translations === false || !translations[lng]) {
			replacer = "$1";
		}
		else {
			return setTimeout(function() {translateTemplate($elm);}, 500);
		}
		
		$elm.html(
			html.replace(/\[([^\]]+)\]/g, replacer)
		);
		
	};
	
	
	var runHar = function(har) {
		window.har = har;
		var newHar = module.exports(window.har, function(content) {
			var elm = document.createElement('span');
			elm.appendChild(document.createTextNode(content));
			return elm.innerHTML;
		});
		
		
		
		
		$.get('src/requestTemplate.html', function(template) {
			var html =  '',
				i = 0,
				ilen = newHar.length,
				prop, nHar, _html;
			for(;i<ilen;i++) {
				nHar = newHar[i];
				_html = template;
				for(prop in nHar) {
					_html = _html.replace(new RegExp('{' + prop + '}','g'), nHar[prop]);
				}
				html += _html;
			}
			$('tbody').html(html);
			$('tfoot tr').html(newHar.info);
			$('caption').html(newHar.title);
			// $('.har-table').html(newHar.title);
			translateTemplate($('tbody').parent());
			$('.loader').hide();
			
			addInteraction($);
		});
		
	};
	
	
	
});