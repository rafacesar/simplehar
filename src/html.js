window.module = {};
(function(d,s) {
	'use strict';
	(s = d.createElement('script')).src = 'src/harParser.js';
	s.id = 'harParser';
	d.body.appendChild(s);
	(s = d.createElement('script')).src = 'lib/unminify.js';
	s.id = 'unminify';
	d.body.appendChild(s);
})(document);
jQuery(function($) {
	'use strict';
	$.getJSON('src/translate.json', function(data) {
		window.translations = data || false;
	});
	$.get('src/template.html', function() {
		$('.container').load('src/template.html table', function() {
			var $table = $('table.har-table');
			$table.find('caption').html('');
			$table.html(translateTemplate($table.html()));
		});
		
		var drop = function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			
			window.scrollTo(0,0);
			
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
		};
		
		$('body').on('dragover', function() {
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
					position:'fixed',
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
				.on('drop', function(evt) {
					var $loader = $('.loader');
					if($loader.length && $loader.is(':visible'))
						return;
					
					return drop(evt);
					
				})
				.appendTo(document.body);
			}
			$drop.data('hide','false');
			return false;
		}).on('dragend', function() {
			return false;
		}).on('dragleave', function() {
			var $drop = $('#drop');
			$drop.data('hide','true');
			setTimeout(function() {
				if($drop.data('hide') === 'true')
					$drop.css('display', 'none');
			}, 50);
			return false;
		}).on('drop', drop);
		
		
		
		
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
	
	var translateTemplate = function(html) {
		var translations = window.translations,
			lng = navigator.language,
			replacer;
		if(translations && translations[lng]) {
			translations = translations[lng];
			replacer = function() {
				var match = arguments[1];
				return (translations[match]) || match;
			};
		}
		else if(translations === false || !translations[lng]) {
			replacer = '$1';
		}
		// else {
		// 	return setTimeout(function() {translateTemplate(elm);}, 500);
		// }
		
		return html.replace(/\[([^\]]+)\]/g, replacer);
		
	};
	
	var replaceAll = function(_s, _f, _r, _c){ 

		var o = _s.toString(),
			r = '',
			s = o,
			b = 0,
			e = -1;
		
		if(_c) {
			_f = _f.toLowerCase();
			s = o.toLowerCase();
		}

		while((e=s.indexOf(_f)) > -1) {
			r += o.substring(b, b+e) + _r;
			s = s.substring(e+_f.length, s.length);
			b += e+_f.length;
		}

		// Add Leftover
		if(s.length>0)
			r += o.substring(o.length-s.length, o.length);

		// Return New String
		return r;
	};
	
	var runHar = function(har) {
		window.har = har;
		var newHar = harParser(window.har, function(content) {
			var elm = document.createElement('span');
			elm.appendChild(document.createTextNode(content));
			return elm.innerHTML;
		});
		
		
		
		$.get('src/requestTemplate.html', function(template) {
			var html =  '',
				i = 0,
				ilen = newHar.length,
				table = $('table.har-table')[0],
				prop, nHar = newHar[0], _html;
			
			for(;i<ilen;i++) {
				nHar = newHar[i];
				_html = template;
				for(prop in nHar) {
					_html = replaceAll(_html, '{' + prop + '}', nHar[prop]);
				}
				html += _html;
			}
			table.getElementsByTagName('tbody')[0].innerHTML = translateTemplate(html);
			table.getElementsByTagName('tfoot')[0]
				 .getElementsByTagName('tr')[0].innerHTML = translateTemplate(newHar.info);
			table.getElementsByTagName('caption')[0].innerHTML = (newHar.title);
			$('.loader').hide();
			
			
			var $parseable = $(table).find('tr.top').find('td.type:contains(css)').add(
					$(table).find('tr.top').find('td.type:contains(javascript)')
				),
				$parent = $parseable.parent(),
				
				parseContent = function(id, type) {
					return function() {
						var $inside = $('#inside-' + id),
							tabs = translateTemplate('<li><a href="#parsedcontent">' + 
													 '[Parsed Content]</a></li>'),
							result = '<div class="parsedcontent hidden" style="' + 
										$inside.find('div').eq(0).attr('style') + '">';
						
						
						result += '<pre class="pre-scrollable">';
						if(type.indexOf('css') !== -1)
							result += unminify.css($inside.find('.content pre').html() || '');
						else if(type.indexOf('javascript') !== -1)
							result += unminify.js($inside.find('.content pre').html() || '');
						result += '</pre>';
						result += '</div>';
						$inside.find('.nav')[0].innerHTML += tabs;
						$inside.find('td').append($(result));
					};
				};
			
			ilen = $parent.length;
			
			while(ilen--)
				setTimeout(
					parseContent($parent.eq(ilen).attr('id').substr(4), $parseable.eq(ilen).text()),
				100);
			
			addInteraction($);
			
		});
		
	};
	
});