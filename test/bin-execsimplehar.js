var expect = require('expect.js'),
	execBin = require('../bin/execSimplehar.js');


describe('Binary Parameter', function() {
	it('should show the version', function() {
		expect(execBin(['', '-v'])).to.be(require('../package.json').version);
	});
	it('should show the help message', function() {
		expect(execBin(['', '--help'])).to.be("\n  Usage: simplehar [harFile] [htmlFile] [frame] [lng]");
	});
	it('should throw an error if without or with empty parameters', function() {
		expect(execBin).withArgs().to.throwException(function(error) {
			expect(error).to.be.a(TypeError);
		});
		expect(execBin).withArgs('').to.throwException(function(error) {
			expect(error).to.be.a(TypeError);
		});
	});
	it('show return the simplest object', function() {
		expect(execBin(['', 'test.har'])).to.eql({
			har:'test.har',
			html:'test.html',
			lng:process.env.LANG || false
		});
	});
	it('should return an object with different html path', function() {
		expect(execBin(['', 'test.har', 'testing.html'])).to.eql({
			har:'test.har',
			html:'testing.html',
			lng:process.env.LANG || false
		});
		expect(execBin(['', 'test.har', 'testing.htm'])).to.eql({
			har:'test.har',
			html:'testing.htm',
			lng:process.env.LANG || false
		});
	});
	it('should return a specific language', function() {
		expect(execBin(['', 'test.har', 'lng=en-US'])).to.eql({
			har:'test.har',
			html:'test.html',
			lng:'en-US'
		});
	});
	it('should return with a frame attribute', function() {
		expect(execBin(['', 'test.har', 'frame'])).to.eql({
			har:'test.har',
			html:'test.html',
			lng:process.env.LANG || false,
			frame:true
		});
	});
});