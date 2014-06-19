var assert = require('assert'),
	expect = require('expect.js'),
	harToHtml = require('../lib/simplehar.js');

describe('Library', function() {
	it('should beautify css', function() {
		expect(harToHtml.beautify({mime:''})).to.eql({mime:''});
		expect(harToHtml.beautify({mime:'css'})).to.eql({mime:'css'});
		expect(harToHtml.beautify({mime:'css'})).to.eql({mime:'css'});
		expect(harToHtml.beautify({mime:'css', tabs:''})).to.eql({mime:'css', tabs:''});
		expect(harToHtml.beautify({mime:'css', tabs:'', tabContainers:''})).to.eql({mime:'css', tabs:'', tabContainers:''});
		expect(harToHtml.beautify({mime:'css', tabs:'', tabContainers:''})).to.eql({mime:'css', tabs:'', tabContainers:''});
		expect(harToHtml.beautify({mime:'css', tabs:'', tabContainers:'', fileContent:''})).to.eql({mime:'css', tabs:'', tabContainers:'', fileContent:''});
		expect(harToHtml.beautify({mime:'css', tabs:'a', tabContainers:'b', fileContent:'*{border:0}'})).to.eql({mime:'css', tabs:'a<li><a href=\"#parsedcontent\">[Parsed Content]</a></li>', tabContainers:"b<div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    border: 0;\n}\n</pre></div>", fileContent:'*{border:0}'});
		
	});
	it('should beautify js', function() {
		expect(harToHtml.beautify({mime:'javascript'})).to.eql({mime:'javascript'});
		expect(harToHtml.beautify({mime:'javascript', tabs:''})).to.eql({mime:'javascript', tabs:''});
		expect(harToHtml.beautify({mime:'javascript', tabs:'', tabContainers:''})).to.eql({mime:'javascript', tabs:'', tabContainers:''});
		expect(harToHtml.beautify({mime:'javascript', tabs:'', tabContainers:'', fileContent:''})).to.eql({mime:'javascript', tabs:'', tabContainers:'', fileContent:''});
		expect(harToHtml.beautify({mime:'javascript', tabs:'a', tabContainers:'b', fileContent:'function(a,b){a={x:1};b([2,3]);};'})).to.eql({mime:'javascript', tabs:'a<li><a href=\"#parsedcontent\">[Parsed Content]</a></li>', tabContainers:"b<div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">function(a, b) {\n    a = {\n        x: 1\n    };\n    b([2, 3]);\n};</pre></div>", fileContent:'function(a,b){a={x:1};b([2,3]);};'});
		
	});
	
	it('should read har file', function() {
		var fs = require('fs');
		expect(harToHtml.readHar(fs.readFileSync('./test/test.har')).encoder).to.be.a(Function);
		expect(harToHtml.readHar(fs.readFileSync('./test/test.har')).har).to.eql({"log":{"version":"1.2","creator":{"name":"WebInspector","version":"537.36"},"pages":[{"startedDateTime":"2014-06-13T22:37:29.053Z","id":"page_2","title":"http://example.com/","pageTimings":{"onContentLoad":125,"onLoad":124.00007247924805}}],"entries":[{"startedDateTime":"2014-06-13T22:37:29.053Z","time":120.00012397766113,"request":{"method":"GET","url":"http://example.com/","httpVersion":"HTTP/1.1","headers":[{"name":"Pragma","value":"no-cache"},{"name":"Accept-Encoding","value":"gzip,deflate,sdch"},{"name":"Host","value":"example.com"},{"name":"Accept-Language","value":"pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36"},{"name":"Accept","value":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"},{"name":"Cache-Control","value":"no-cache"},{"name":"Connection","value":"keep-alive"}],"queryString":[],"cookies":[],"headersSize":401,"bodySize":0},"response":{"status":200,"statusText":"OK","httpVersion":"HTTP/1.1","headers":[{"name":"Date","value":"Fri, 13 Jun 2014 22:37:28 GMT"},{"name":"x-ec-custom-error","value":"1"},{"name":"Last-Modified","value":"Fri, 09 Aug 2013 23:54:35 GMT"},{"name":"Server","value":"ECS (fll/0761)"},{"name":"Etag","value":"\"359670651\""},{"name":"X-Cache","value":"HIT"},{"name":"Content-Type","value":"text/html"},{"name":"Cache-Control","value":"max-age=604800"},{"name":"Accept-Ranges","value":"bytes"},{"name":"Content-Length","value":"1270"},{"name":"Expires","value":"Fri, 20 Jun 2014 22:37:28 GMT"}],"cookies":[],"content":{"size":1270,"mimeType":"text/html","compression":0},"redirectURL":"","headersSize":321,"bodySize":1270},"cache":{},"timings":{"blocked":0.9999999310821295,"dns":-1,"connect":-1,"send":0,"wait":119.00000018067658,"receive":0.00012386590242385864,"ssl":-1},"connection":"3555033","pageref":"page_2"}]}})
		
	});
	
	it('should parse template', function() {
		expect(harToHtml.requestsToHtml([{a:1,b:'c',d:'test'}, {a:'testing',b:123,d:'another thing'}], '<strong>{a}</strong>{b}<em>{d}</em>')).to.be('<strong>1</strong>c<em>test</em><strong>testing</strong>123<em>another thing</em>');
		expect(harToHtml.requestsToHtml([{mime:'css'}], '<strong>{mime}</strong>')).to.be('<strong>css</strong>');
		expect(harToHtml.requestsToHtml([{
			mime:'css',
			tabs: 'tabs',
			tabContainers: 'tabContainers',
			fileContent: '*{margin:0}'
		}], '<strong>{mime}</strong>{tabs}{tabContainers}{fileContent}')).to.be('<strong>css</strong>tabs<li><a href="#parsedcontent">[Parsed Content]</a></li>tabContainers<div class="parsedcontent hidden"><pre class="pre-scrollable">* {\n    margin: 0;\n}\n</pre></div>*{margin:0}');
	});
	
	it('should merge string and create assets files', function() {
		var fs = require('fs'),
			path = require('path'),
			simpleharSrcPath = path.join(path.dirname(undefined), 'simpleharSrc');
		expect(harToHtml.mergingRequests('testing', 'template:{har}|{info}|{title}', {info:'', title:''}, {})).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\ttemplate:testing||\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.mergingRequests('testing', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {})).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\ttemplate:testing|some|thing\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {lng:'pt-BR'})).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\ttemplate:testing-Tamanho|some|thing\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {lng:'', frame:true})).to.be('template:testing-Size|some|thing');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {lng:'pt-BR', frame:true})).to.be('template:testing-Tamanho|some|thing');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true})).to.be('template:testing-Size|some|thing');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}|||{style}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true})).to.be('template:testing-Size|some|thing|||<style>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString() + '</style>');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}|||{script}', {info:'some', title:'thing'}, {frame:true})).to.be('template:testing-Size|some|thing|||<script>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString() + '</script>');
		expect(harToHtml.mergingRequests('testing-[Size]', '-{style}--{script}-template:{har}|{info}|{title}', {info:'some', title:'thing'}, {})).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t----template:testing-Size|some|thing\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(fs.existsSync(simpleharSrcPath)).to.be(true);
		expect(fs.existsSync(path.join(simpleharSrcPath, 'script.js'))).to.be(true);
		expect(fs.existsSync(path.join(simpleharSrcPath, 'stupidtable.js'))).to.be(true);
		expect(fs.existsSync(path.join(simpleharSrcPath, 'style.css'))).to.be(true);
		
		fs.unlinkSync(path.join(simpleharSrcPath, 'script.js'));
		fs.unlinkSync(path.join(simpleharSrcPath, 'stupidtable.js'));
		fs.unlinkSync(path.join(simpleharSrcPath, 'style.css'));
		fs.rmdirSync(simpleharSrcPath);
		
	});
	
	it('should merge strings and return assets with html', function() {
		var fs = require('fs'),
			path = require('path');
		
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true, frameContent:{css:false, js:false}})).to.eql({html:'template:testing-Size|some|thing', css:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString(), js:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString()});
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}----{style}{script}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true, frameContent:{css:false, js:false}})).to.eql({html:'template:testing-Size|some|thing----', css:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString(), js:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString()});
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}----{style}{script}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true, frameContent:{js:false}})).to.eql({html:'template:testing-Size|some|thing----<style>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString() + '</style>', css:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString(), js:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString()});
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}----{style}{script}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true, frameContent:{css:false}})).to.eql({html:'template:testing-Size|some|thing----<script>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString() + '</script>', css:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString(), js:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString()});
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}----{script}{style}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true, frameContent:{}})).to.eql({html:'template:testing-Size|some|thing----<script>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString() + '</script><style>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString() + '</style>', css:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString(), js:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString()});
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}----{script}{style}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true})).to.be('template:testing-Size|some|thing----<script>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString() + '</script><style>' + fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString() + '</style>');
		expect(harToHtml.mergingRequests('testing-[Size]', 'template:{har}|{info}|{title}', {info:'some', title:'thing'}, {lng:'pt-PT', frame:true, return:true, frameContent:{}})).to.eql({html:'template:testing-Size|some|thing', css:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'style.css')).toString(), js:fs.readFileSync(path.join(path.dirname(__filename), '..', 'src', 'script.js')).toString()});
	});
	
});