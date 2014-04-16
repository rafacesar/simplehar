module.exports = function(args) {
	'use strict';

	var fs = require('fs'),
		path = require('path'),
		basefolder = path.dirname(fs.realpathSync(__filename)),
		srcFolder = path.join(basefolder, '..', 'src'),
		hth = require(path.join(srcFolder, 'harParser.js'));
	
	
	
	fs.readFile(args.har,function(err, har) {
		if(err) throw err;
		
		har = JSON.parse(har);
		
		var encode = function() {
			var Ent = require('html-entities').XmlEntities,ent;
			ent = new Ent();
			return ent.encode;
		};
		
		var newHar = hth(har, encode());
		
		
		fs.readFile(path.join(srcFolder, 'requestTemplate.html'), function(err,template) {
			if(err) throw err;
			
			var html =  '',
				i = 0,
				ilen = newHar.length,
				prop, nHar, _html;
			for(;i<ilen;i++) {
				nHar = newHar[i];
				_html = template.toString();
				for(prop in nHar) {
					_html = _html.replace(new RegExp('{' + prop + '}','g'), nHar[prop]);
				}
				html += _html;
			}
			
			fs.readFile(path.join(srcFolder, 'template.html'), function(err,tableTemplate) {
				if(err) throw err;
				
				html = tableTemplate
						.toString()
						.replace('{har}', html)
						.replace('{info}', newHar.info)
						.replace('{title}', newHar.title);
				
				var tpl, css, js, replacer, translations,
					lng = args.lng || false;
				
				
				if(!args.frame) {
					html = html.replace('{style}', '').replace('{script}', '');
					tpl = fs.readFileSync(path.join(basefolder, '..', 'index.html'));
					html = tpl
						.toString()
						.replace('{content}', html)
						.replace('<script src="src/html.js"></script>', '')
						.replace(/"src\//g,'"node_modules/simplehar/src/');
				}
				else {	
					css = fs.readFileSync(path.join(srcFolder, 'style.css'));
					html = html.replace('{style}', '<style>' + css + '</style>');
					
					js = fs.readFileSync(path.join(srcFolder, 'script.js'));
					html = html.replace('{script}', '<script>' + js + '</script>');
				}
				
				
				
				if(fs.existsSync(path.join(srcFolder, 'translate.json')) && lng) {
					translations = fs.readFileSync(path.join(srcFolder, 'translate.json'));
					try {
						translations = JSON.parse(translations);
					}
					catch(e) {
						translations = false;
					}
					
					
					if(translations && translations[lng]) {
						replacer = function(complete, match) {
							return (translations[lng][match]) || match;
						};
					}
					else if(translations === false) {
						replacer = "$1";
					}
				}
				else {
					replacer = "$1";
				}
				
				html = html.replace(/\[([^\]]+)\]/g, replacer);
				
				
				fs.writeFile(args.html, html, function(err) {
					if(err) throw err;
				});
				
			});
			
			
		});
		
		
	});

};