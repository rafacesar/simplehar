var execBin = function(argv) {
	'use strict';
	
	var fs = require('fs'),
		path = require('path'),
		args = {},
		htmlExt = '.html',
		i, ilen, simplehar;
	
	
	//Removing the parameters that are not used
	if(argv.shift().indexOf('node') != -1)
		argv.shift();
	
	
	ilen = argv.length;
	
	
	
	//Showing the version
	i = 0;
	while(i < ilen) {
		
		if(argv[i] == '-v')
			return require('../package.json').version;
		
		i++;
	}
	
	
	
	
	//Showing help message
	i = 0;
	while(i < ilen) {
		
		if(argv[i] == '--help') {
			return '--help';
		}
		
		i++;
	}
	
	
	
	
	//Getting the path of the har file
	i = 0;
	while( !args.har && i < ilen) {
		if(argv[i].lastIndexOf('.har') + 4 == argv[i].length)
			args.har = argv[i];
		i++;
	}

	if(!args.har)
		throw('Har not specified.');
	
	args.har = path.normalize(args.har);
	
	
	
	
	//Getting the path of the html file
	i = 0;
	while( !args.html && i < ilen) {
		if(argv[i].lastIndexOf('.html') + 5 == argv[i].length) {
			args.html = argv[i];
		}
		else if(argv[i].lastIndexOf('.htm') + 4 == argv[i].length) {
			args.html = argv[i];
			htmlExt = '.htm';
		}
		
		i++;
	}

	if(!args.html)
		args.html = path.basename(args.har, '.har') + htmlExt;
	
	args.html = path.normalize(args.html);



	
	
	//Getting the language
	i = 0;
	while( !args.lng && i < ilen) {
		
		if(argv[i].indexOf('lng=') === 0)
			args.lng = argv[i].split('=')[1];
		
		i++;
		
	}

	args.lng = args.lng || process.env.LANG || false;

	
	
	
	//Verifying frame option
	i = 0;
	while( !args.frame && i < ilen) {
		
		if(argv[i].toLowerCase() === 'frame')
			args.frame = true;
		
		i++;
	}
	
	
	
	
	return args;
	
};
module.exports = execBin;