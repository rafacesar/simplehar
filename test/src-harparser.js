var expect = require('expect.js'),
	harParser = require('../src/harParser.js');


describe('Har Parser', function() {
	it('should parse the method', function() {
		expect(harParser.parseMethod('get')).to.be('');
		expect(harParser.parseMethod('GET')).to.be('');
		expect(harParser.parseMethod('post')).to.be('<strong>post</strong>');
		expect(harParser.parseMethod('POST')).to.be('<strong>POST</strong>');
		expect(harParser.parseMethod('HEAD')).to.be('<strong>HEAD</strong>');
	});
	it('should parse the http status', function() {
		expect(harParser.parseStatus(0, '')).to.eql({
			code:0,
			complete:'0',
			status:'<em class="text-muted">0</em>'
		});
		expect(harParser.parseStatus(200, 'OK')).to.eql({
			code:200,
			complete:'200 OK',
			status:200
		});
		expect(harParser.parseStatus(301, 'Moved Permanently')).to.eql({
			code:301,
			complete:'301 Moved Permanently',
			status:301
		});
		expect(harParser.parseStatus(304, 'Not Modified')).to.eql({
			code:304,
			complete:'304 Not Modified',
			status:304
		});
		expect(harParser.parseStatus(404, 'Not Found')).to.eql({
			code:404,
			complete:'404 Not Found',
			status:'<strong class="text-warning">404</strong>'
		});
		expect(harParser.parseStatus(500, 'Internal Server Error')).to.eql({
			code:500,
			complete:'500 Internal Server Error',
			status:'<strong class="text-danger">500</strong>'
		});
	});
	it('should parse the mime type', function() {
		expect(harParser.parseMime('')).to.eql({
			base:'',
			complete:'',
			inline:false,
			type:''
		});
		expect(harParser.parseMime('', 'invalid url')).to.eql({
			base:'',
			complete:'',
			inline:false,
			type:''
		});
		expect(harParser.parseMime('text/html')).to.eql({
			base:'text',
			complete:'text/html',
			inline:false,
			type:'html'
		});
		expect(harParser.parseMime('text/css')).to.eql({
			base:'text',
			complete:'text/css',
			inline:false,
			type:'css'
		});
		expect(harParser.parseMime('text/css', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')).to.eql({
			base:'text',
			complete:'text/css',
			inline:false,
			type:'css'
		});
		expect(harParser.parseMime('', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')).to.eql({
			base:'image',
			complete:'image/gif',
			inline:true,
			type:'gif'
		});
	});
	it('should parse the size', function() {
		expect(harParser.parseSize(50, 20, 200)).to.eql({
			originalSize: '50 Bytes',
			originalCompressed: '20 Bytes',
			size: '20 Bytes',
			complete: 50,
			compressed: 20
		});
		expect(harParser.parseSize(50, 20, 304)).to.eql({
			originalSize: '50 Bytes',
			originalCompressed: '20 Bytes',
			size: '<em>20 Bytes</em>',
			complete: 50,
			compressed: 20
		});
		expect(harParser.parseSize(50, 0, 200)).to.eql({
			originalSize: '50 Bytes',
			originalCompressed: '0 Bytes',
			size: '<strong>50 Bytes</strong>',
			complete: 50,
			compressed: 0
		});
		expect(harParser.parseSize(0, 20, 200)).to.eql({
			originalSize: '0 Bytes',
			originalCompressed: '20 Bytes',
			size: '20 Bytes',
			complete: 0,
			compressed: 20
		});
		expect(harParser.parseSize(0, 0, 200)).to.eql({
			originalSize: '0 Bytes',
			originalCompressed: '0 Bytes',
			size: '<strong>0 Bytes</strong>',
			complete: 0,
			compressed: 0
		});
		expect(harParser.parseSize(0, 0)).to.eql({
			originalSize: '0 Bytes',
			originalCompressed: '0 Bytes',
			size: '<strong>0 Bytes</strong>',
			complete: 0,
			compressed: 0
		});
		expect(harParser.parseSize(-10, -20, 200)).to.eql({
			originalSize: '-10 Bytes',
			originalCompressed: '-20 Bytes',
			size: '<strong>0 Bytes</strong>',
			complete: -10,
			compressed: -20
		});
		expect(harParser.parseSize(-10, -20)).to.eql({
			originalSize: '-10 Bytes',
			originalCompressed: '-20 Bytes',
			size: '<strong>0 Bytes</strong>',
			complete: -10,
			compressed: -20
		});
	});
	it('should format size', function() {
		expect(harParser.dataSizeFormatter(1024)).to.be('1024 Bytes');
		expect(harParser.dataSizeFormatter(1024, 3)).to.be('1024 Bytes');
		expect(harParser.dataSizeFormatter(1025)).to.be('1 KB');
		expect(harParser.dataSizeFormatter(1025, 3)).to.be('1.001 KB');
		expect(harParser.dataSizeFormatter(2080)).to.be('2.03 KB');
		expect(harParser.dataSizeFormatter(2080, 3)).to.be('2.031 KB');
		expect(harParser.dataSizeFormatter(123901293021)).to.be('115.39 GB');
		expect(harParser.dataSizeFormatter(123901293021, 3)).to.be('115.392 GB');
		
		expect(harParser.dataSizeFormatter(1239012930215376485764786)).to.be('1126875695459.04 TB');
	});
	it('should parse URL', function() {
		expect(harParser.parseUrl).withArgs().to.throwError();
		expect(harParser.parseUrl('http://example.com')).to.eql({
			params:'',
			file:'/',
			complete:'http://example.com'
		});
		expect(harParser.parseUrl('https://example.com/')).to.eql({
			params:'',
			file:'<strong class="text-success">/</strong>',
			complete:'https://example.com/'
		});
		expect(harParser.parseUrl('https://example.com')).to.eql({
			params:'',
			file:'<strong class="text-success">/</strong>',
			complete:'https://example.com'
		});
		expect(harParser.parseUrl('http://example.com/index.html')).to.eql({
			params:'',
			file:'index.html',
			complete:'http://example.com/index.html'
		});
		expect(harParser.parseUrl('http://example.com', true)).to.eql({
			params:'',
			file:'http://example.com',
			complete:'http://example.com'
		});
		expect(harParser.parseUrl('http://example.com/', true)).to.eql({
			params:'',
			file:'http://example.com/',
			complete:'http://example.com/'
		});
		expect(harParser.parseUrl('https://example.com/index.html')).to.eql({
			params:'',
			file:'<strong class="text-success">index.html</strong>',
			complete:'https://example.com/index.html'
		});
		expect(harParser.parseUrl('ftp://example.com/test.js')).to.eql({
			params:'',
			file:'test.js',
			complete:'ftp://example.com/test.js'
		});
		expect(harParser.parseUrl('http://example.com/dir/?param=%C3%A1')).to.eql({
			params:'?param=á',
			file:'/dir/',
			complete:'http://example.com/dir/?param=%C3%A1'
		});
		expect(harParser.parseUrl('http://example.com/dir/?param=%C3%A1', true)).to.eql({
			params:'?param=á',
			file:'http://example.com/dir/',
			complete:'http://example.com/dir/?param=%C3%A1'
		});
		expect(harParser.parseUrl('http://example.com/dir/page.htm?param=value#hashstring')).to.eql({
			params:'?param=value#hashstring',
			file:'page.htm',
			complete:'http://example.com/dir/page.htm?param=value#hashstring'
		});
		expect(harParser.parseUrl('https://example.com/dir/page.htm?param=value#hashstring')).to.eql({
			params:'?param=value#hashstring',
			file:'<strong class="text-success">page.htm</strong>',
			complete:'https://example.com/dir/page.htm?param=value#hashstring'
		});
		expect(harParser.parseUrl('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')).to.eql({
			params:'',
			file:'<strong>Data:</strong>',
			complete:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		});
		expect(harParser.parseUrl('INVALID URL')).to.eql({
			params:'',
			file:'INVALID URL',
			complete:'INVALID URL'
		});
	});
	it('should parse the content', function() {
		var htmlEntities = require('html-entities').XmlEntities;
		htmlEntities = new htmlEntities();
		htmlEntities = htmlEntities.encode;
		
		expect(harParser.parseContent).withArgs().to.throwError();
		
		expect(harParser.parseContent('', '', '')).to.eql({
			tabs:'',
			result:'',
			_result:''
		});
		expect(harParser.parseContent('<strong>teste</strong>', '', '')).to.eql({
			tabs:'',
			result:'',
			_result:''
		});
		expect(harParser.parseContent('', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', '')).to.eql({
			tabs:'',
			result:'',
			_result:''
		});
		expect(harParser.parseContent('<strong>teste</strong>', '', {base:'text'})).to.eql({
			tabs:'',
			result:'',
			_result:''
		});
		expect(harParser.parseContent('', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', {base:'image'})).to.eql({
			tabs:'<li><a href="#content">[Content]</a></li>',
			result:'<div class="content"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></div>',
			_result:''
		});
		expect(harParser.parseContent('<strong>teste</strong>', '', {base:'text'}, htmlEntities)).to.eql({
			tabs:'<li><a href="#content">[Content]</a></li>',
			result:'<div class="content"><pre class="pre-scrollable">&lt;strong&gt;teste&lt;/strong&gt;</pre></div>',
			_result:'&lt;strong&gt;teste&lt;/strong&gt;'
		});
		expect(harParser.parseContent('<strong>tésté</strong>', '', {base:'text'}, htmlEntities)).to.eql({
			tabs:'<li><a href="#content">[Content]</a></li>',
			result:'<div class="content"><pre class="pre-scrollable">&lt;strong&gt;tésté&lt;/strong&gt;</pre></div>',
			_result:'&lt;strong&gt;tésté&lt;/strong&gt;'
		});
		expect(harParser.parseContent('', 'http://example.com/gif.gif', {base:'image'}, htmlEntities)).to.eql({
			tabs:'<li><a href="#content">[Content]</a></li>',
			result:'<div class="content"><img src="http://example.com/gif.gif" /></div>',
			_result:''
		});
		expect(harParser.parseContent('', 'http://example.com/gif.gif', {base:'image'})).to.eql({
			tabs:'<li><a href="#content">[Content]</a></li>',
			result:'<div class="content"><img src="http://example.com/gif.gif" /></div>',
			_result:''
		});
	});
	it('should parse the timings', function() {
		var fs = require('fs'),
			path = require('path'),
			har = fs.readFileSync(path.join(path.dirname(__filename), 'test.har'));
		
		har = JSON.parse(har.toString());
		expect(harParser.parseProgress({
			"timings": {
			"blocked": 0.6489999996119877,
			"dns": 0.05400000009103678,
			"connect": 11.163000001033652,
			"send": 0.12199999946460593,
			"wait": 15.643999999156222,
			"receive": 1.5771369635331212,
			"ssl": -1
			},
			"startedDateTime": "2014-04-23T04:57:20.534Z",
			"time": 29.209136962890625
		})).to.eql({
			startedDateTime:1398229040534,
			blocked:0.6489999996119877,
			dns:0.05400000009103678,
			connect:11.163000001033652,
			send:0.12199999946460593,
			wait:15.643999999156222,
			receive:1.5771369635331212,
			ssl:-1,
			total:29.209136962890625,
			time:29.209136962890625
		});
		expect(harParser.parseProgress).withArgs().to.throwError();
	});
	it('should format number precision', function() {
		expect(harParser.precisionFormatter(3.432423)).to.be('3.43');
		expect(harParser.precisionFormatter(32.005)).to.be('32.01');
		expect(harParser.precisionFormatter(32.005,3)).to.be('32.005');
		expect(harParser.precisionFormatter(32.0,5)).to.be('32');
		expect(harParser.precisionFormatter(32.5,5)).to.be('32.50000');
	});
	it('should add strong tag', function() {
		expect(harParser.strong('')).to.be('<strong></strong>');
		expect(harParser.strong('test')).to.be('<strong>test</strong>');
		expect(harParser.strong('test', 'testing')).to.be('<strong class="testing">test</strong>');
	});
	it('should add em tag', function() {
		expect(harParser.em('')).to.be('<em></em>');
		expect(harParser.em('test')).to.be('<em>test</em>');
		expect(harParser.em('test', 'testing')).to.be('<em class="testing">test</em>');
	});
	it('should return pct value', function() {
		expect(harParser.pct()).to.be(0);
		expect(harParser.pct('')).to.be(0);
		expect(harParser.pct(35, 100)).to.be('35%');
		expect(harParser.pct(35, 50)).to.be('70%');
		expect(harParser.pct(35, .1)).to.be('35000%');
		expect(harParser.pct(2, 100)).to.be('2%');
		expect(harParser.pct(.1, 100)).to.be('0.1%');
		expect(harParser.pct(58, 100)).to.be('58%');
	});
	it('should format time', function() {
		expect(harParser.timeFormatter(600,2)).to.be('600ms');
		expect(harParser.timeFormatter(6000,2)).to.be('6s');
		expect(harParser.timeFormatter(321456,2)).to.be('5.36min');
		expect(harParser.timeFormatter(725769.35737,3)).to.be('12.096min');
		expect(harParser.timeFormatter(1000000000,2)).to.be('277.78h');
		expect(harParser.timeFormatter(1000,2)).to.be('1s');
		expect(harParser.timeFormatter(3211313132,5)).to.be('892.03143h');
		expect(harParser.timeFormatter(725769.35,5)).to.be('12.09616min');
	});
	it('should decode object list', function() {
		expect(harParser.decodeObj([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}], false)).to.eql([{name:'test', value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}]);
		expect(harParser.decodeObj([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}], true)).to.eql([{name:'test', value:'][áóçõü'}, {name:'testing',value:'][áóçõü'}]);
		expect(harParser.decodeObj([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}], true, ['ing'])).to.eql([{name:'test', value:'][áóçõü'}]);
	});
	
	it('should generate a DL list', function() {
		expect(harParser.listObjToDl([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}])).to.be('<dl class="dl-horizontal"><dt>test</dt><dd>][áóçõü</dd><dt>testing</dt><dd>%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC</dd></dl>');
		expect(harParser.listObjToDl([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}], true)).to.be('<dl class="dl-horizontal"><dt>test</dt><dd>][áóçõü</dd><dt>testing</dt><dd>][áóçõü</dd></dl>');
	});
	
});