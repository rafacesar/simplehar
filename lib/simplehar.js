var fs = require('fs'),
	path = require('path'),
	unminify = require('./unminify.js'),
	simplehar = function(args) {
		'use strict';
		var har = args.har,
			harParser = require(path.join(__filename, '..', '..', 'src', 'harParser.js')),
			html;
		
		
		if(args.callback) {
			
			simplehar.readHar(har, function(har) {
				
				har = harParser(har, simplehar.getEncoder());
				
				simplehar.requestsToHtml(har, function(html) {
					
					simplehar.fullHtml(html, har, function(html) {
						
						simplehar.translate(html, args.lng || false, function(html) {
							
							if(args.frame)
								html = simplehar.makeFrame(html, args.frameContent);
							else {
								simplehar.copySrc(path.dirname(args.html));
								html = simplehar.completePage(html, path.dirname(args.html));
							}
							
							if(args.return)
								args.callback(html);
							else
								fs.writeFile(args.html, html.html || html, function(err) {
									if(err) throw err;
									args.callback();
								});
						});
						
					});
					
				});
				
			});
			
		}
		else {
			har = simplehar.readHar(har);
			
			har = harParser(har, simplehar.getEncoder());
			
			html = simplehar.requestsToHtml(har);
			
			html = simplehar.fullHtml(html, har);
			
			html = simplehar.translate(html, args.lng || false);
			
			if(args.frame)
				html = simplehar.makeFrame(html, args.frameContent);
			else {
				simplehar.copySrc(path.dirname(args.html));
				html = simplehar.completePage(html, path.dirname(args.html));
			}
			
			if(args.return)
				return html;
			else
				fs.writeFileSync(args.html, html.html || html);
		}
		
	};

//Reading and parsing JSON file
simplehar.readHar = function(har, callback) {
	'use strict';
	var result = function(har) {
		return JSON.parse(har);
	};
	
	if(callback) {
		fs.readFile(har, function(err, har) {
			if(err) throw err;
			
			callback(result(har));
		});
	}
	else {
		har = fs.readFileSync(har);
		return result(har);
	}
};

//Getting encoder module, if exists
simplehar.getEncoder = function() {
	'use strict';
	var encodeFunc;
	
	try {
		encodeFunc = (new (require('html-entities').XmlEntities)()).encode;
	}
	catch(e) {
		encodeFunc = false;
	}
	
	return encodeFunc;
};

//Change the har to html
simplehar.requestsToHtml = function(har, callback) {
	'use strict';
	var requestTemplate = path.join(__filename, '..', '..', 'src', 'requestTemplate.html'),
		result = function(requestTemplate) {
			return simplehar.templater(har, requestTemplate, function(request) {
				var mime = simplehar.possibleBeautifiers(request.mime);
				
				if(mime)
					request = simplehar.beautifyTab(request, mime);
				
				return request;
			});
		};
	
	if(callback) {
		fs.readFile(requestTemplate, function(err, requestTemplate) {
			if(err) throw err;
			
			callback(result(requestTemplate));
		});
	}
	else {
		requestTemplate = fs.readFileSync(requestTemplate).toString();
		return result(requestTemplate);
	}
	
};

//Return the obj with the tabs and the code beautified
simplehar.beautifyTab = function(obj, mime) {
	'use strict';
	if(mime && obj && obj.tabs && obj.tabContainers && obj.fileContent) {
		obj.tabs += '<li><a href="#parsedcontent">[Parsed Content]</a></li>';
		obj.tabContainers += '<div class="parsedcontent hidden"><pre class="pre-scrollable">';
		
		obj.tabContainers += unminify[mime](obj.fileContent);
		
		obj.tabContainers += '</pre></div>';
	}
	return obj;
};


//Return codes that can be beautified
simplehar.possibleBeautifiers = function(mime) {
	'use strict';
	if(mime) {
		if(mime === 'css')
			return 'css';
		if(mime.indexOf('javascript') !== -1)
			return 'js';
	}
	return false;
};

//Replaces specific strings using a list of objects
simplehar.templater = function(objList, template, extra) {
	'use strict';
	var result = '',
		i = 0,
		ilen = objList.length,
		obj;
	
	template = template.toString();
	
	for(;i<ilen;i++) {
		obj = objList[i];
		
		if(extra)
			obj = extra(obj);
		
		
		result += simplehar.simpleTemplater(obj, template);
		
	}
	
	return result;
};

//Replaces specific strings using one object
simplehar.simpleTemplater = function(obj, template) {
	'use strict';
	for(var prop in obj)
		template = template.replace(new RegExp('{' + prop + '}', 'g'), obj[prop]);
	return template;
};

//Add informations in the full html
simplehar.fullHtml = function(html, har, callback) {
	'use strict';
	var template = path.join(__filename, '..', '..', 'src', 'template.html'),
		result = function(template, html, har) {
			return simplehar.simpleTemplater({
				har:html,
				info:har.info,
				title:har.title
			},template);
		};
	
	if(callback) {
		fs.readFile(template, function(err, template) {
			if(err) throw err;
			
			callback(result(template.toString(), html, har));
		});
	}
	else {
		template = fs.readFileSync(template).toString();
		return result(template, html, har);
	}
	
};

//Translating the static content
simplehar.translate = function(text, language, callback) {
	'use strict';
	var translation = path.join(__filename, '..', '..', 'src', 'translate.json'),
		result = function(text, language, translation) {
			var replacer = '$1';
			
			if(language) {
				translation = JSON.parse(translation);
				translation = translation[language];
				
				if(translation) {
					replacer = function() {
						var match = arguments[1];
						return (translation[match]) || match;
					};
				}
			}
			
			return text.replace(/\[([^\]]+)\]/g, replacer);
		};
	
	if(callback) {
		fs.readFile(translation, function(err, translation) {
			if(err) throw err;
			
			callback(result(text, language, translation));
		});
	}
	else {
		translation = fs.readFileSync(translation);
		return result(text, language, translation);
		
	}
};

//Create frame obj or string
simplehar.makeFrame = function(html, args) {
	'use strict';
	var css = path.join(__filename, '..', '..', 'src', 'style.css'),
		js = path.join(__filename, '..', '..', 'src', 'script.js');
	
	css = fs.readFileSync(css).toString();
	js = fs.readFileSync(js).toString();
	
	if(args) {
		return {
			css:css,
			js:js,
			html:simplehar.simpleTemplater({
				style:args.css!==false?('<style>' + css + '</style>'):'',
				script:args.js!==false?('<script>' + js + '</script>'):''
			}, html)
		};
	}
	
	return simplehar.simpleTemplater({
		script:'<script>' + js + '</script>',
		style:'<style>' + css + '</style>'
	}, html);
	
};

//Copy the source to simpleharSrc folder
simplehar.copySrc = function(dir) {
	'use strict';
	var simpleharSrc = path.join(dir, 'simpleharSrc'),
		srcFolder = path.join(__filename, '..', '..', 'src'),
		copyFileSync = function(srcFile, destFile) {
		
		var BUF_LENGTH = 64 * 1024,
			buff = new Buffer(BUF_LENGTH),
			bytesRead = 1,
			fdr = fs.openSync(srcFile, 'r'),
			fdw = fs.openSync(destFile, 'w'),
			pos = 0;
		
		while (bytesRead > 0) {
			
			bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
			
			fs.writeSync(fdw, buff, 0, bytesRead);
			
			pos += bytesRead;
			
		}
		
		fs.closeSync(fdr);
		
		return fs.closeSync(fdw);
	};
	
	
	if(!fs.existsSync(simpleharSrc)) {
		fs.mkdirSync(simpleharSrc);
			
		copyFileSync(path.join(srcFolder,'script.js'), path.join(simpleharSrc,'script.js'));
		copyFileSync(path.join(srcFolder,'style.css'), path.join(simpleharSrc,'style.css'));
		copyFileSync(
			path.join(srcFolder,'stupidtable.js'),
			path.join(simpleharSrc,'stupidtable.js')
		);
	}
	
};

//Create the final html page
simplehar.completePage = function(html) {
	'use strict';
	var index = fs.readFileSync(path.join(__filename, '..', '..', 'index.html')).toString();
	
	html = simplehar.simpleTemplater({
		style:'',
		script:''
	}, html);
	
	html = simplehar.simpleTemplater({
		content:html
	}, index);
	
	html = html
			.replace('<script src="src/html.js"></script>', '')
			.replace(/"src\//g,'"simpleharSrc/');
	
	return html;
};

module.exports = simplehar;