var assert = require('assert'),
	expect = require('expect.js'),
	harToHtml = require('../lib/simplehar.js');

describe('Library', function() {
		
		
	
	it('should read har file', function() {
		expect(harToHtml.readHar('./test/test.har')).to.eql({"log":{"version":"1.2","creator":{"name":"WebInspector","version":"537.36"},"pages":[{"startedDateTime":"2014-06-13T22:37:29.053Z","id":"page_2","title":"http://example.com/","pageTimings":{"onContentLoad":125,"onLoad":124.00007247924805}}],"entries":[{"startedDateTime":"2014-06-13T22:37:29.053Z","time":120.00012397766113,"request":{"method":"GET","url":"http://example.com/","httpVersion":"HTTP/1.1","headers":[{"name":"Pragma","value":"no-cache"},{"name":"Accept-Encoding","value":"gzip,deflate,sdch"},{"name":"Host","value":"example.com"},{"name":"Accept-Language","value":"pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36"},{"name":"Accept","value":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"},{"name":"Cache-Control","value":"no-cache"},{"name":"Connection","value":"keep-alive"}],"queryString":[],"cookies":[],"headersSize":401,"bodySize":0},"response":{"status":200,"statusText":"OK","httpVersion":"HTTP/1.1","headers":[{"name":"Date","value":"Fri, 13 Jun 2014 22:37:28 GMT"},{"name":"x-ec-custom-error","value":"1"},{"name":"Last-Modified","value":"Fri, 09 Aug 2013 23:54:35 GMT"},{"name":"Server","value":"ECS (fll/0761)"},{"name":"Etag","value":"\"359670651\""},{"name":"X-Cache","value":"HIT"},{"name":"Content-Type","value":"text/html"},{"name":"Cache-Control","value":"max-age=604800"},{"name":"Accept-Ranges","value":"bytes"},{"name":"Content-Length","value":"1270"},{"name":"Expires","value":"Fri, 20 Jun 2014 22:37:28 GMT"}],"cookies":[],"content":{"size":1270,"mimeType":"text/html","compression":0},"redirectURL":"","headersSize":321,"bodySize":1270},"cache":{},"timings":{"blocked":0.9999999310821295,"dns":-1,"connect":-1,"send":0,"wait":119.00000018067658,"receive":0.00012386590242385864,"ssl":-1},"connection":"3555033","pageref":"page_2"}]}});
	});
	it('should get encoder to html', function() {
		expect(harToHtml.getEncoder()).to.be.a(Function);
	});
		
	it('should parse any template with lists', function() {
		expect(harToHtml.templater([{a:1,b:'c',d:'test'}, {a:'testing',b:123,d:'another thing'}], '<strong>{a}</strong>{b}<em>{d}</em>')).to.be('<strong>1</strong>c<em>test</em><strong>testing</strong>123<em>another thing</em>');
		expect(harToHtml.templater([{mime:'css'}], '<strong>{mime}</strong>')).to.be('<strong>css</strong>');
		expect(harToHtml.templater([{
			tabs: 'tabs',
			tabContainers: 'tabContainers',
			mime:'css',
			fileContent: '*{margin:0}'
		}], '<strong>{mime}</strong>{tabs}{tabContainers}{fileContent}')).to.be('<strong>css</strong>tabstabContainers*{margin:0}');
	});
	
	it('should parse any single template', function() {
		expect(harToHtml.simpleTemplater({a:1,b:'c',d:'test'}, '<strong>{a}</strong>{b}<em>{d}</em>')).to.be('<strong>1</strong>c<em>test</em>');
		expect(harToHtml.simpleTemplater({a:'testing',b:123,d:'another thing'}, '<strong>{a}</strong>{b}<em>{d}</em>')).to.be('<strong>testing</strong>123<em>another thing</em>');
		expect(harToHtml.simpleTemplater({mime:'css'}, '<strong>{mime}</strong>')).to.be('<strong>css</strong>');
		expect(harToHtml.simpleTemplater({
			tabs: 'tabs',
			fileContent: '*{margin:0}',
			tabContainers: 'tabContainers',
			mime:'css'
		}, '<strong>{mime}</strong>{tabs}{tabContainers}{fileContent}')).to.be('<strong>css</strong>tabstabContainers*{margin:0}');
	});
	
	it('should parse template', function() {
		expect(harToHtml.requestsToHtml).withArgs().to.throwError();
		expect(harToHtml.requestsToHtml('')).to.be('');
		expect(harToHtml.requestsToHtml([])).to.be('');
		expect(harToHtml.requestsToHtml([{a:1,b:'c',d:'test'}, {a:'testing',b:123,d:'another thing'}])).to.be('<tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
		expect(harToHtml.requestsToHtml([{
			bgstatus:'a',
			rId:1,
			sign:'x',
			toggleSign:'toggle',
			fullUrl:'testingurl',
			order:92,
			method:'abc',
			fileName:'file.asp',
			params:'tests|tests',
			fullStatus:'OK',
			status:01010,
			fullMimeType:'test/testing',
			mime:'tessssttt',
			size:010101,
			fullSize:918274,
			sizeToShow:'m9c9b',
			progressStart:'some text',
			progressContent:'more text',
			totalTime:'totalTime',
			startPosition:123123,
			blockedWidth:'a lot of content',
			dnsWidth:'lorem ipsum',
			connectWidth:'dolor sit',
			sendWidth:'amed ...',
			waitWidth:'blablabla',
			receiveWidth:'another text',
			renderstarted:'test text',
			domloaded:'DOM loaded',
			windowloaded:'full loaded',
			tabs:'<li></li>',
			tabContainers:'<div></div>'
		}, {}])).to.be('<tr class="top bg-a" id="top-1">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon x" data-toggle-sign="glyphicon toggle"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong><span class="order">92.</span>abc file.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">520</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">tessssttt</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="4161" title="4161 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="92" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-1">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li>\n\t\t</ul>\n\t\t<div></div>\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
		expect(harToHtml.requestsToHtml([{
			bgstatus:'a',
			rId:1,
			sign:'x',
			toggleSign:'toggle',
			fullUrl:'testingurl',
			order:92,
			method:'abc',
			fileName:'file.asp',
			params:'tests|tests',
			fullStatus:'OK',
			status:01010,
			fullMimeType:'test/testing',
			mime:'css',
			size:010101,
			fullSize:918274,
			sizeToShow:'m9c9b',
			progressStart:'some text',
			progressContent:'more text',
			totalTime:'totalTime',
			startPosition:123123,
			blockedWidth:'a lot of content',
			dnsWidth:'lorem ipsum',
			connectWidth:'dolor sit',
			sendWidth:'amed ...',
			waitWidth:'blablabla',
			receiveWidth:'another text',
			renderstarted:'test text',
			domloaded:'DOM loaded',
			windowloaded:'full loaded',
			tabs:'<li></li>',
			tabContainers:'<div></div>',
			fileContent:'rafael'
		}, {}])).to.be('<tr class="top bg-a" id="top-1">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon x" data-toggle-sign="glyphicon toggle"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong><span class="order">92.</span>abc file.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">520</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="4161" title="4161 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="92" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-1">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">rafael</pre></div>\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
		expect(harToHtml.requestsToHtml([{
			bgstatus:'a',
			rId:1,
			sign:'x',
			toggleSign:'toggle',
			fullUrl:'testingurl',
			order:92,
			method:'abc',
			fileName:'file.asp',
			params:'tests|tests',
			fullStatus:'OK',
			status:01010,
			fullMimeType:'test/testing',
			mime:'css',
			size:010101,
			fullSize:918274,
			sizeToShow:'m9c9b',
			progressStart:'some text',
			progressContent:'more text',
			totalTime:'totalTime',
			startPosition:123123,
			blockedWidth:'a lot of content',
			dnsWidth:'lorem ipsum',
			connectWidth:'dolor sit',
			sendWidth:'amed ...',
			waitWidth:'blablabla',
			receiveWidth:'another text',
			renderstarted:'test text',
			domloaded:'DOM loaded',
			windowloaded:'full loaded',
			tabs:'<li></li>',
			tabContainers:'<div></div>',
			fileContent:'*{margin:0;}'
		}, {}])).to.be('<tr class="top bg-a" id="top-1">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon x" data-toggle-sign="glyphicon toggle"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong><span class="order">92.</span>abc file.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">520</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="4161" title="4161 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="92" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-1">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    margin: 0;\n}\n</pre></div>\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
	});
	
	it('should return codes that can be beautified', function() {
		expect(harToHtml.possibleBeautifiers('')).to.be(false);
		expect(harToHtml.possibleBeautifiers('test')).to.be(false);
		expect(harToHtml.possibleBeautifiers('css')).to.be('css');
		expect(harToHtml.possibleBeautifiers('js')).to.be(false);
		expect(harToHtml.possibleBeautifiers('jscript')).to.be(false);
		expect(harToHtml.possibleBeautifiers('javascript')).to.be('js');
		expect(harToHtml.possibleBeautifiers('x-javascript')).to.be('js');
		expect(harToHtml.possibleBeautifiers('x-css')).to.be(false);
	});
	
	it('should return the tab with the beautified code', function() {
		expect(harToHtml.beautifyTab()).to.be(undefined);
		expect(harToHtml.beautifyTab({})).to.eql({});
		expect(harToHtml.beautifyTab({
			tabs:'',
			tabContainers:'',
			fileContent:''
		})).to.eql({
			tabs:'',
			tabContainers:'',
			fileContent:''
		});
		expect(harToHtml.beautifyTab({
			tabs:'',
			tabContainers:'',
			fileContent:''
		}, 'css')).to.eql({
			tabs:'',
			tabContainers:'',
			fileContent:''
		});
		expect(harToHtml.beautifyTab({
			tabs:' ',
			tabContainers:' ',
			fileContent:' '
		}, 'css')).to.eql({
			tabs:' <li><a href=\"#parsedcontent\">[Parsed Content]</a></li>',
			tabContainers:' <div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\"> </pre></div>',
			fileContent:' '
		});
		expect(harToHtml.beautifyTab({
			tabs:' ',
			tabContainers:' ',
			fileContent:'*{margin:0;}'
		}, 'css')).to.eql({
			tabs:' <li><a href=\"#parsedcontent\">[Parsed Content]</a></li>',
			tabContainers:' <div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    margin: 0;\n}\n</pre></div>',
			fileContent:'*{margin:0;}'
		});
		expect(harToHtml.beautifyTab).withArgs({
			tabs:' ',
			tabContainers:' ',
			fileContent:'*{margin:0;}'
		}, 'test').to.throwError();
	});
		
	it('should insert informations in the html', function() {
		expect(harToHtml.fullHtml).withArgs().to.throwError();
		expect(harToHtml.fullHtml).withArgs('').to.throwError();
		expect(harToHtml.fullHtml('', {})).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>undefined</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tundefined\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		expect(harToHtml.fullHtml('test', {title:'titleContent', info:'some information'})).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>test</tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		expect(harToHtml.fullHtml('', {title:'titleContent', info:'some information'})).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
	});
	
	it('should merge strings and return assets with html', function() {
	});
	
});