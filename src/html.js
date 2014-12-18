(function(w, d, $) {
	'use strict';
	w.module = {};
	$.create = function(e) {return $(d.createElement(e));};
	var
	appendScript = function(path) {
		return $.create('script').attr({
			src: path,
			id: path.split('/')[1].split('.')[0]
		}).appendTo(d.body);
	},
	translateTemplate = function(html) {
		var translations = w.translations,
			lng = w.navigator.language,
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
		
		return html.replace(/\[([^\]]+)\]/g, replacer);
		
	},
	replaceAll = function(_s, _f, _r, _c) {

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
	},
	localAccessWarning = function() {
		$.create('p')
		.addClass('sh-localaccesswarning')
		.append(
			$.create('span')
			.text('Local Ajax is not supported :(')
		).appendTo(d.body);
		$('body').html($('body').html().replace('{content}', ''));
	},
	runHar = function(newHar, $tableTemplate) {
		for(var i=0, ilen=newHar.length, status;i<ilen;i++) {
			newHar[i].order = i + 1;
			newHar[i].rId = Math.floor((Math.random()*(new Date()).getTime())+1);
			status = newHar[i].status;
			if(!status || status < 300)
				newHar[i].bgstatus = '';
			else if(status >= 500)
				newHar[i].bgstatus = 'danger';
			else if(status >= 400)
				newHar[i].bgstatus = 'warning';
			else if(status >= 300)
				newHar[i].bgstatus = 'redirect';
		}
		
		
		$.get('src/requestTemplate.html', function(template) {
			var html =  '',
				i = 0,
				ilen = newHar.length,
				$table = $tableTemplate,
				prop, nHar = newHar[0], _html,
				$parseable, $parent, parseContent;
			
			for(;i<ilen;i++) {
				nHar = newHar[i];
				_html = template;
				for(prop in nHar) {
					_html = replaceAll(_html, '{' + prop + '}', nHar[prop]);
				}
				html += _html;
			}
			$table.find('tbody').html(translateTemplate(html));
			$table.find('tfoot tr').html(translateTemplate(newHar.info));
			$table.find('caption').html(newHar.title);
			$table.appendTo($('.sh-container'));
			$('.sh-loader').hide();
			
			
			$parseable = $table.find('tr.top').find('td.type:contains(css)').add(
				$table.find('tr.top').find('td.type:contains(javascript)')
			);
			$parent = $parseable.parent();
			
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
			
			$('.sh-container .popover, .sh-container .tooltip').remove();
			
			addInteraction($, $table);
			
		});
		
	},
	drop = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		
		w.scrollTo(0,0);
		
		var files = evt.originalEvent.dataTransfer.files,
			$drop = $('#drop'),
			$loader = $('.sh-loader'),
			file, reader;
		
		$drop
			.css('display', 'none')
			.data('hide', 'true');
		
		if(files.length) {
			
			if($loader.length)
				$loader.show();
			else
				$loader = $.create('div').addClass('sh-loader').appendTo(d.body);
		
		
			file = files[0];
			
			reader = new FileReader();
			
			reader.onload = function (evt) {
				var har, $table = $('.sh-table'), $newTable;
				try {
					har = JSON.parse(evt.target.result);
				}
				catch(e) {
					w.alert(translateTemplate('[Invalid JSON]'));
					$('.sh-loader').hide();
					return;
				}
				$table.find('tbody, tfoot tr, caption').html('');
				$table.find('.tooltip, .popover').remove();
				
				$newTable = $table.first().clone();
				
				$table.remove();
				
				
				
				har = harParser(har, function(content) {
					var elm = d.createElement('span');
					elm.appendChild(d.createTextNode(content));
					return elm.innerHTML;
				});
				
				w.har = har;
				for(var i=0,ilen=har.length;i<ilen;i++)
					runHar(har[i], $newTable.clone());
				
			};
			reader.readAsText(file);
		}
		
		return false;
	},
	dragover = function() {
		var $drop = $('#drop');
		if($drop.length) {
			$drop.css('display', 'table');
		}
		else {
			$.create('div')
			.attr('id', 'drop')
			.addClass('sh-dropfile')
			.append($.create('span').text(translateTemplate('[Drop Here! :)]')))
			.on('drop', function(evt) {
				var $loader = $('.sh-loader');
				if($loader.length && $loader.is(':visible'))
					return;
				
				return drop(evt);
				
			})
			.appendTo(d.body);
		}
		
		$drop.data('hide','false');
		return false;
	},
	dragleave = function() {
		var $drop = $('#drop');
		$drop.data('hide','true');
		
		setTimeout(function() {
			if($drop.data('hide') === 'true')
				$drop.css('display', 'none');
		}, 50);
		
		return false;
	};
	appendScript('src/harParser.js');
	appendScript('lib/unminify.js');
	
	$.getJSON('src/translate.json', function(data) {
		w.translations = data || false;
		
		$.get('src/template.html', function() {
			$('.container').load('src/template.html table', function() {
				var $table = $('table.sh-table');
				$table.find('caption').html('');
				$table.html(translateTemplate($table.html()));
			});
			
			
			
			$('body')
				.on('dragover', dragover)
				.on('dragend', function() {return false;})
				.on('dragleave', dragleave)
				.on('drop', drop);
				
		})
		.fail(localAccessWarning);
	});
	
	
	
})(window, document, jQuery);
