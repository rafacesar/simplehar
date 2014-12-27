/*jshint maxlen:false, globalstrict:true */
/*global it, describe */
'use strict';
var expect = require('expect.js'),
	processArgs = require('../bin/processArgs.js');


describe('Binary Parameter', function() {
	it('should show the version', function() {
		expect(processArgs(['', '-v'])).to.be(require('../package.json').version);
	});
	it('should show the help message', function() {
		expect(processArgs(['', '--help']))
			.to.be('\n  Usage: simplehar `harFile` [htmlFile] [frame] [lng]');
	});
	it('should throw an error if without or with empty parameters', function() {
		expect(processArgs).withArgs().to.throwException(function(error) {
			expect(error).to.be.a(TypeError);
		});
		expect(processArgs).withArgs('').to.throwException(function(error) {
			expect(error).to.be.a(TypeError);
		});
	});
	it('show return the simplest object', function() {
		expect(processArgs(['', 'test.har'])).to.eql({
			har:'test.har',
			html:'test.html',
			commandLine:true,
			lng:process.env.LANG || false
		});
	});
	it('should return an object with .html in the filename', function() {
		expect(processArgs(['', 'test.har', 'testing.html'])).to.eql({
			har:'test.har',
			html:'testing.html',
			commandLine:true,
			lng:process.env.LANG || false
		});
	});
	it('should return an object with .htm in the filename', function() {
		expect(processArgs(['', 'test.har', 'testing.htm'])).to.eql({
			har:'test.har',
			html:'testing.htm',
			commandLine:true,
			lng:process.env.LANG || false
		});
	});
	it('should return a specific language', function() {
		expect(processArgs(['', 'test.har', 'lng=en-US'])).to.eql({
			har:'test.har',
			html:'test.html',
			lng:'en-US',
			commandLine:true
		});
	});
	it('should return with a frame attribute', function() {
		expect(processArgs(['', 'test.har', 'frame'])).to.eql({
			har:'test.har',
			html:'test.html',
			commandLine:true,
			lng:process.env.LANG || false,
			frame:true
		});
	});
});