module.exports = function(grunt) {
	
	grunt.initConfig({
		mochaTest: {
			test: {
				src:['test/**/*.js']
			}
		},
		jshint: {
			bin: {
				options: {
					jshintrc:true,
				},
				files: {
					src:['bin/*.js', 'lib/simplehar.js', 'src/harParser.js']
				}
			},
			
			online: {
				options: {
					browser:true,
					globals: {
						jQuery:true,
						alert:true,
						harParser:true,
						unminify:true,
						addInteraction:true
					},
					"node": true,
					"esnext": false,
					"bitwise": true,
					"curly": false,
					"freeze": true,
					"eqeqeq": true,
					"immed": true,
					"indent": 4,
					"maxparams": 4,
					"newcap": true,
					"noempty": true,
					"nonbsp": true,
					"noarg": true,
					"quotmark": "single",
					"latedef": true,
					"undef": true,
					"unused": "strict",
					"strict": true,
					"trailing": true,
					"smarttabs": true,
					"maxcomplexity": 20,
					"maxlen": 100
				},
				files: {
					src: ['src/html.js', 'src/script.js']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.registerTask('default', ['mochaTest', 'jshint']);
	
};