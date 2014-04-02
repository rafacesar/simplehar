(function() {
	'use strict';

	var fs = require('fs');
	
	fs.readFile('teste.har',function(err, har) {
		if(err) throw err;
		
		fs.readFile('teste.har', function(err, har) {
			if(err) throw err;
			
			var js = 'var har = ' + har.toString();
			
			fs.writeFile('har.js', js, function(err) {
				if(err) throw err;
			});
			
		});
		
		
		fs.readFile('molde.html', function(err, html) {
			if(err) throw err;
			
			fs.writeFile('teste.html', html, function(err) {
				if(err) throw err;
			});
			
		});
		
	});




})();