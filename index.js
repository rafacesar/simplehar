(function() {
	'use strict';

	var fs = require('fs'),
		hth = require('./src/harParser.js'),
		args = (function(args) {

			var result = {},
				tmp;
			
			for(var i=2,ilen=args.length;i<ilen;i++) {
				if(~args[i].indexOf('=')) {
					tmp = args[i].split('=');
					result[tmp[0]] = tmp[1];
				}
				else {
					result[args[i]] = true;
				}
			}
			
			return result;
		})(process.argv);
	
	
	fs.readFile(args.har,function(err, har) {
		if(err) throw err;
		
		har = JSON.parse(har);
		
		var encode = (function() {
			var Ent = require('html-entities').XmlEntities,ent;
			ent = new Ent();
			return ent.encode;
		})();
		
		var newHar = hth(har, encode);
		
		
		fs.readFile('src/requestTemplate.html', function(err,template) {
			if(err) throw err;
			
			var html =  '',
				i = 0,
				ilen = newHar.entries.length,
				prop, nHar, _html;
			for(;i<ilen;i++) {
				nHar = newHar.entries[i];
				_html = template.toString();
				for(prop in nHar) {
					_html = _html.replace(new RegExp('{' + prop + '}','g'), nHar[prop]);
				}
				html += _html;
			}
			
			fs.readFile('src/template.html', function(err,tableTemplate) {
				if(err) throw err;
				
				html = tableTemplate
						.toString()
						.replace('{har}', html)
						.replace('{info}', newHar.info);
				
				var tpl, css, js;
				
				
				if(!args.frame) {
					html = html.replace('{style}', '').replace('{script}', '');
					tpl = fs.readFileSync('index.html');
					html = tpl
						.toString()
						.replace('{content}', html)
						.replace('<script src="src/html.js"></script>', '');
				}
				else {	
					css = fs.readFileSync('src/style.css');
					html = html.replace('{style}', '<style>' + css + '</style>');
					
					js = fs.readFileSync('src/script.js');
					html = html.replace('{script}', '<script>' + js + '</script>');
				}
				
				
				fs.writeFile(args.html, html, function(err) {
					if(err) throw err;
				});
				
			});
			
			
		});
		
		
	});




})();