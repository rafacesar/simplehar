/*jshint globalstrict:true */
'use strict';
module.exports = function(grunt) {
	var jshintrc = grunt.file.readJSON('./.jshintrc'),
		browserJshintrc = grunt.file.readJSON('./.jshintrc');
	
	browserJshintrc.browser = true;
	browserJshintrc.globals = {
		jQuery:true,
		alert:true,
		harParser:true,
		unminify:true,
		addInteraction:true
	};
	browserJshintrc.node = false;
	
	
	grunt.initConfig({
		mochaTest: {
			test: {
				src:['test/**/*.js']
			}
		},
		csslint: {
			test: {
				options: {
					'box-model':false
				},
				src:['**/*.css', '!node_modules/**']
			}
		},
		jshint: {
			bin: {
				options: jshintrc,
				files: {
					src:['bin/*.js', 'lib/simplehar.js', 'src/harParser.js', 'test/**.js']
				}
			},
			
			online: {
				options: browserJshintrc,
				files: {
					src: ['src/html.js', 'src/script.js']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	
	grunt.registerTask('default', ['mochaTest', 'jshint', 'csslint']);
	
};