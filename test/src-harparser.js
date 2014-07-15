var expect = require('expect.js'),
	harParser = require('../src/harParser.js');


describe('Har Parser', function() {
	it('should parse the method', function() {
		expect(harParser.parseMethod('get')).to.be('');
		expect(harParser.parseMethod('GET')).to.be('');
		expect(harParser.parseMethod('post')).to.be('<strong>post </strong>');
		expect(harParser.parseMethod('POST')).to.be('<strong>POST </strong>');
		expect(harParser.parseMethod('HEAD')).to.be('<strong>HEAD </strong>');
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
	
	it('should decode a text', function() {
		expect(harParser.decode('%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC')).to.be('][áóçõü');
	});
	it('should decode a multiple encoded text', function() {
		expect(harParser.decoder('%2525255B')).to.be('[');
		expect(harParser.decoder('%25252525255B')).to.be('[');
		expect(harParser.decoder('%252525255B%5B')).to.be('[[');
		
	});
	
	it('should filter a list of objects attributes', function() {
		expect(harParser.filterObjList([{some:'object'}, { attr:'Test', value:'anything'}, {attr:'anothertest', value:'other thing'}, {attr:'my', value:'test'}, {attr:'testing', value:'again'}, {attr:'something', value:'some value'}], 'attr', 'test')).to.eql([{some:'object'}, {attr:'my', value:'test'}, {attr:'something', value:'some value'}]);
		expect(harParser.filterObjList([{anotherattrname:'test', value:'anything'}, {anotherattrname:'anothertest', value:'other thing'}, {anotherattrname:'my', value:'test'}, {anotherattrname:'testing', value:'again'}, {anotherattrname:'something', value:'some value'}], 'anotherattrname', 'test')).to.eql([{anotherattrname:'my', value:'test'}, {anotherattrname:'something', value:'some value'}]);
	});
	
	it('should decode object list', function() {
		expect(harParser.decodeObj([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}])).to.eql([{name:'test', value:'][áóçõü'}, {name:'testing',value:'][áóçõü'}]);
		expect(harParser.decodeObj([{name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}])).to.eql([{name:'testing',value:'][áóçõü'}]);
	});
	
	it('should generate a DL list', function() {
		expect(harParser.objToDl([{name:'test',value:'][áóçõü'}, {name:'testing',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}])).to.be('<dl class="dl-horizontal"><dt>test</dt><dd>][áóçõü</dd><dt>testing</dt><dd>%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC</dd></dl>');
		expect(harParser.objToDl([{name:'test',value:'%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC'}, {name:'testing',value:'][áóçõü'}])).to.be('<dl class="dl-horizontal"><dt>test</dt><dd>%5D%5B%C3%A1%C3%B3%C3%A7%C3%B5%C3%BC</dd><dt>testing</dt><dd>][áóçõü</dd></dl>');
	});
	
	it('should generate an object with the tab content', function() {
		expect(harParser.tabContainer).to.throwError();
		expect(harParser.tabContainer({tab:'headers', decode:false, filter:'cookie'}, {headers:[{name:'teste', value:'value'}, {name:'testeCookie', value:'value'}]}, {headers:[{name:'teste', value:'value'}, {name:'testeCookie', value:'value'}]})).to.eql({ tabs: '<li><a href="#headers">[Headers]</a></li>',containers: '<div class="headers"><h3 class="headers-title"><small>[Request Headers]</small></h3><dl class="dl-horizontal"><dt>teste</dt><dd>value</dd></dl><h3 class="headers-title"><small>[Response Headers]</small></h3><dl class="dl-horizontal"><dt>teste</dt><dd>value</dd></dl></div>'});
		expect(harParser.tabContainer({tab:'test', decode:true}, {test:[{name:'teste', value:'value'}]}, {test:[{name:'teste', value:'value'}]})).to.eql({ tabs: '<li><a href="#test">[Test]</a></li><li><a href="#parsedtest">[Parsed Test]</a></li>',containers: '<div class="test"><h3 class="headers-title"><small>[Request Test]</small></h3><dl class="dl-horizontal"><dt>teste</dt><dd>value</dd></dl><h3 class="headers-title"><small>[Response Test]</small></h3><dl class="dl-horizontal"><dt>teste</dt><dd>value</dd></dl></div><div class="parsedtest"><h3 class="headers-title"><small>[Request Test]</small></h3><dl class="dl-horizontal"><dt>teste</dt><dd>value</dd></dl><h3 class="headers-title"><small>[Response Test]</small></h3><dl class="dl-horizontal"><dt>teste</dt><dd>value</dd></dl></div>'});
		expect(harParser.tabContainer({tab:'tabname', decode:false}, {tabname:[{name:'testing', value:'v%C3%A1l%C3%BC%C3%A8'}]}, {tabname:[{name:'another test', value:'my value;with something;here'}]})).to.eql({ tabs: '<li><a href="#tabname">[Tabname]</a></li>',containers: '<div class="tabname"><h3 class="headers-title"><small>[Request Tabname]</small></h3><dl class="dl-horizontal"><dt>testing</dt><dd>v%C3%A1l%C3%BC%C3%A8</dd></dl><h3 class="headers-title"><small>[Response Tabname]</small></h3><dl class="dl-horizontal"><dt>another test</dt><dd>my value;<br>with something;<br>here</dd></dl></div>'});
		expect(harParser.tabContainer({tab:'tabname', decode:true, filter:'cookie'}, {tabname:[{name:'testingCookie', value:'v%C3%A1l%C3%BC%C3%A8'}]}, {tabname:[{name:'another test', value:'my value;with %C3%A0n%C3%93therth%C3%AD%C3%B1g;here'}]})).to.eql({ tabs: '<li><a href="#tabname">[Tabname]</a></li><li><a href="#parsedtabname">[Parsed Tabname]</a></li>',containers: '<div class="tabname"><h3 class="headers-title"><small>[Response Tabname]</small></h3><dl class="dl-horizontal"><dt>another test</dt><dd>my value;<br>with %C3%A0n%C3%93therth%C3%AD%C3%B1g;<br>here</dd></dl></div><div class="parsedtabname"><h3 class="headers-title"><small>[Response Tabname]</small></h3><dl class="dl-horizontal"><dt>another test</dt><dd>my value;<br>with ànÓtherthíñg;<br>here</dd></dl></div>'});
		expect(harParser.tabContainer({tab:'tabname', decode:true}, {tabname:[{name:'some name', value:'v%C3%A1l%C3%BC%C3%A8'}]}, {tabname:[{name:'another test', value:'my value;with %C3%A0n%C3%93therth%C3%AD%C3%B1g;here'}]})).to.eql({ tabs: '<li><a href="#tabname">[Tabname]</a></li><li><a href="#parsedtabname">[Parsed Tabname]</a></li>',containers: '<div class="tabname"><h3 class="headers-title"><small>[Request Tabname]</small></h3><dl class="dl-horizontal"><dt>some name</dt><dd>v%C3%A1l%C3%BC%C3%A8</dd></dl><h3 class="headers-title"><small>[Response Tabname]</small></h3><dl class="dl-horizontal"><dt>another test</dt><dd>my value;<br>with %C3%A0n%C3%93therth%C3%AD%C3%B1g;<br>here</dd></dl></div><div class="parsedtabname"><h3 class="headers-title"><small>[Request Tabname]</small></h3><dl class="dl-horizontal"><dt>some name</dt><dd>válüè</dd></dl><h3 class="headers-title"><small>[Response Tabname]</small></h3><dl class="dl-horizontal"><dt>another test</dt><dd>my value;<br>with ànÓtherthíñg;<br>here</dd></dl></div>'});
	});
	
	it('should return the object list with progress parsed informations', function() {
		expect(harParser.convertProgress).to.throwError();
		expect(harParser.convertProgress([{startedDateTime:0, blocked:0, dns:0, connect:0, send:0, wait:0, receive:0}, {startedDateTime:0, blocked:0, dns:0, connect:0, send:0, wait:0, receive:0}], 50)).to.eql([ { progressStart: '<strong>[Start Time]: </strong> <em> 0ms</em>', totalTime: '0ms', progressContent: '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> 0ms</em></p>', startPosition: 0, blockedWidth: 0, dnsWidth: 0, connectWidth: 0, sendWidth: 0, waitWidth: 0, receiveWidth: 0 }, { progressStart: '<strong>[Start Time]: </strong> <em> 0ms</em>', totalTime: '0ms', progressContent: '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> 0ms</em></p><p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> 0ms</em></p>', startPosition: 0, blockedWidth: 0, dnsWidth: 0, connectWidth: 0, sendWidth: 0, waitWidth: 0, receiveWidth: 0 } ]);
		expect(harParser.convertProgress([
			{
				startedDateTime:1, blocked:2, dns:3, connect:4, send:5, wait:6, receive:7, total:15
			},
			{
				startedDateTime:8, blocked:9, dns:10, connect:11, send:12, wait:13, receive:14, total:0
			},
			{
				startedDateTime:13, blocked:12, dns:11, connect:10, send:9, wait:8, receive:7
			},
			{
				startedDateTime:6, blocked:5, dns:4, connect:3, send:2, wait:1, receive:0
			}
		], 178.9)).to.eql([
			{
				progressStart: '<strong>[Start Time]: </strong> <em> 0ms</em>',
				progressContent: '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> 2ms</em></p><p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> 3ms</em></p><p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> 4ms</em></p><p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> 5ms</em></p><p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> 6ms</em></p><p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> 7ms</em></p>',
				startPosition: 0,
				blockedWidth: "1.1179429849077698%",
				dnsWidth: "1.6769144773616544%",
				connectWidth: "2.2358859698155396%",
				sendWidth: "2.794857462269424%",
				waitWidth: "3.353828954723309%",
				totalTime: '15ms',
				receiveWidth: "3.9128004471771938%"
			},
			{
				progressStart: '<strong>[Start Time]: </strong> <em> 7ms</em>',
				progressContent: '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> 9ms</em></p><p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> 10ms</em></p><p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> 11ms</em></p><p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> 12ms</em></p><p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> 13ms</em></p><p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> 14ms</em></p>',
				startPosition: "3.9128004471771938%",
				blockedWidth: "5.0307434320849636%",
				dnsWidth: "5.589714924538848%",
				connectWidth: "6.148686416992733%",
				sendWidth: "6.707657909446618%",
				waitWidth: "7.266629401900503%",
				totalTime: '0ms',
				receiveWidth: "7.8256008943543875%"
			},
			{
				progressStart: '<strong>[Start Time]: </strong> <em> 12ms</em>',
				progressContent: '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> 12ms</em></p><p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> 11ms</em></p><p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> 10ms</em></p><p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> 9ms</em></p><p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> 8ms</em></p><p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> 7ms</em></p>',
				startPosition: "6.707657909446618%",
				blockedWidth: "6.707657909446618%",
				dnsWidth: "6.148686416992733%",
				connectWidth: "5.589714924538848%",
				sendWidth: "5.0307434320849636%",
				waitWidth: "4.471771939631079%",
				totalTime: '0ms',
				receiveWidth: "3.9128004471771938%"
			},
			{
				progressStart: '<strong>[Start Time]: </strong> <em> 5ms</em>',
				progressContent: '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> 5ms</em></p><p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> 4ms</em></p><p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> 3ms</em></p><p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> 2ms</em></p><p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> 1ms</em></p><p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> 0ms</em></p>',
				startPosition: "2.794857462269424%",
				blockedWidth: "2.794857462269424%",
				dnsWidth: "2.2358859698155396%",
				connectWidth: "1.6769144773616544%",
				sendWidth: "1.1179429849077698%",
				totalTime: '0ms',
				waitWidth: "0.5589714924538849%",
				receiveWidth: 0
			}
		]);
	});
});