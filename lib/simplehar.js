module.exports = function(args) {
	'use strict';

	var fs = require('fs'),
		path = require('path'),
		basefolder = path.dirname(fs.realpathSync(__filename)),
		srcFolder = path.join(basefolder, '..', 'src'),
		simpleharSrc = path.join(process.cwd(), 'simpleharSrc'),
		hth = require(path.join(srcFolder, 'harParser.js'));
	
	
	
	var copyFileSync = function(srcFile, destFile) {
		
		var BUF_LENGTH = 64 * 1024,
			buff = new Buffer(BUF_LENGTH),
			bytesRead = 1,
			fdr = fs.openSync(srcFile, "r"),
			fdw = fs.openSync(destFile, "w"),
			pos = 0;
		
		while (bytesRead > 0) {
			
			bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
			
			fs.writeSync(fdw, buff, 0, bytesRead);
			
			pos += bytesRead;
			
		}
		
		fs.closeSync(fdr);
		
		return fs.closeSync(fdw);
	};
	
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
						.replace(/"src\//g,'"simpleharSrc/');
					
					if(!args.frame) {
						if(!fs.existsSync(simpleharSrc)) {
							fs.mkdirSync(simpleharSrc);
							
							copyFileSync(path.join(srcFolder,'script.js'), path.join(simpleharSrc,'script.js'));
							copyFileSync(path.join(srcFolder,'style.css'), path.join(simpleharSrc,'style.css'));
							copyFileSync(path.join(srcFolder,'stupidtable.js'), path.join(simpleharSrc,'stupidtable.js'));
						}
					}
					
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