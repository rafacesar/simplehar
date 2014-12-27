var processArgs = function(argv) {
	'use strict';
	
	var path = require('path'),
		args = {},
		ilen,
		help,
		result,
		getVersion = function(args, ilen) {
			var i = 0;
			while(i < ilen) {
				
				if(args[i] === '-v')
					return require(path.join('..','package.json')).version;
				
				i++;
			}
			return false;
		},
		getHelpMessage = function(args, ilen) {
			var i = 0;
			while(i < ilen) {
				
				if(args[i] === '--help') {
					help = [
						'',
						'Usage: simplehar `harFile` [htmlFile] [frame] [lng]'
					];
					return help.join('\n  ');
				}
				
				i++;
			}
			return false;
		},
		getHar = function(args, ilen) {
			var i = 0,
				har;
			while( !har && i < ilen) {
				if(args[i].lastIndexOf('.har') + 4 === args[i].length)
					har = args[i];
				i++;
			}
			
			if(!har)
				throw('Har not specified.');
			
			har = path.normalize(har);
			
			return har;
		},
		getHtml = function(args, har, ilen) {
			var i = 0,
				htmlExt = '.html',
				html;
			while( !html && i < ilen) {
				if(args[i].lastIndexOf('.html') + 5 === args[i].length) {
					html = args[i];
				}
				else if(args[i].lastIndexOf('.htm') + 4 === args[i].length) {
					html = args[i];
					htmlExt = '.htm';
				}
				
				i++;
			}

			if(!html)
				html = path.basename(har, '.har') + htmlExt;
			
			html = path.normalize(html);
			
			return html;
		},
		getLanguage = function(args, ilen) {
			var i = 0,
				lng;
			while( !lng && i < ilen) {
				
				if(args[i].indexOf('lng=') === 0)
					lng = args[i].split('=')[1];
				
				i++;
				
			}

			return lng || process.env.LANG || false;
		},
		hasFrame = function(args, ilen) {
			var i = 0,
				frame = false;
			while( !frame && i < ilen) {
				
				if(args[i].toLowerCase() === 'frame')
					frame = true;
				
				i++;
			}
			
			return frame;
		};
	
	
	//Removing the parameters that are not used
	if(argv.shift().indexOf('node') !== -1)
		argv.shift();
	
	
	ilen = argv.length;
	
	
	
	//Showing the version
	result = getVersion(argv, ilen);
	if(result)
		return result;
	
	
	
	
	//Showing help message
	result = getHelpMessage(argv, ilen);
	if(result)
		return result;
	
	
	
	
	
	//Getting the path of the har file
	args.har = getHar(argv, ilen);
	
	
	
	//Getting the path of the html file
	args.html = getHtml(argv, args.har, ilen);



	
	
	//Getting the language
	args.lng = getLanguage(argv, ilen);

	
	
	
	//Verifying frame option
	result = hasFrame(argv, ilen);
	if(result)
		args.frame = result;
	
	
	args.commandLine = true;
	
	
	return args;
	
};
module.exports = processArgs;