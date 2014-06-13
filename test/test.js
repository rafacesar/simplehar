var assert = require('assert'),
	execBin = require('../bin/execSimplehar.js');


describe('Binary Options', function() {
	it('Version', function() {
		assert.equal('0.14.0', execBin(['', '-v']));
	});
	it('Help', function() {
		assert.equal('--help', execBin(['', '--help']));
	});
	it('Simple Call', function() {
		assert
			.deepEqual({
				har:'test.har',
				html:'test.html',
				lng:process.env.LANG || false
			}, execBin(['', 'test.har']));
	});
});