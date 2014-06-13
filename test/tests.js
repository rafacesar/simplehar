var assert = require('assert'),
	harToHtml = require('../lib/simplehar.js');

describe('Library', function() {
	it('Beautify', function() {
		assert.deepEqual({mime:''}, harToHtml.beautify({mime:''}), 'empty');
		assert.deepEqual({mime:'css'}, harToHtml.beautify({mime:'css'}), 'half-empty css');
		assert.deepEqual({mime:'css'}, harToHtml.beautify({mime:'css'}), 'half-empty css');
		assert.deepEqual({mime:'css', tabs:''}, harToHtml.beautify({mime:'css', tabs:''}), 'half-empty css tabs');
		assert.deepEqual({mime:'css', tabs:'', tabContainers:''}, harToHtml.beautify({mime:'css', tabs:'', tabContainers:''}), 'half-empty css tabs containers');
		assert.deepEqual({mime:'css', tabs:'', tabContainers:''}, harToHtml.beautify({mime:'css', tabs:'', tabContainers:''}), 'half-empty css tabs containers');
		assert.deepEqual({mime:'css', tabs:'', tabContainers:'', fileContent:''}, harToHtml.beautify({mime:'css', tabs:'', tabContainers:'', fileContent:''}), 'half-full');
		assert.deepEqual({mime:'css', tabs:'a<li><a href=\"#parsedcontent\">[Parsed Content]</a></li>', tabContainers:"b<div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    border: 0;\n}\n</pre></div>", fileContent:'*{border:0}'}, harToHtml.beautify({mime:'css', tabs:'a', tabContainers:'b', fileContent:'*{border:0}'}), 'full css');
		
		assert.deepEqual({mime:'javascript'}, harToHtml.beautify({mime:'javascript'}), 'half-empty js');
		assert.deepEqual({mime:'javascript', tabs:''}, harToHtml.beautify({mime:'javascript', tabs:''}), 'half-empty js tabs');
		assert.deepEqual({mime:'javascript', tabs:'', tabContainers:''}, harToHtml.beautify({mime:'javascript', tabs:'', tabContainers:''}), 'half-empty js tabs containers');
		assert.deepEqual({mime:'javascript', tabs:'', tabContainers:''}, harToHtml.beautify({mime:'javascript', tabs:'', tabContainers:''}), 'half-empty js tabs containers');
		assert.deepEqual({mime:'javascript', tabs:'', tabContainers:'', fileContent:''}, harToHtml.beautify({mime:'javascript', tabs:'', tabContainers:'', fileContent:''}), 'half-full');
		assert.deepEqual({mime:'javascript', tabs:'a<li><a href=\"#parsedcontent\">[Parsed Content]</a></li>', tabContainers:"b<div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">function(a, b) {\n    a = {\n        x: 1\n    };\n    b([2, 3]);\n};</pre></div>", fileContent:'function(a,b){a={x:1};b([2,3]);};'}, harToHtml.beautify({mime:'javascript', tabs:'a', tabContainers:'b', fileContent:'function(a,b){a={x:1};b([2,3]);};'}), 'full js');
	});
	
	it('Read Har', function() {
		var fs = require('fs');
		assert.equal('function', typeof harToHtml.readHar(fs.readFileSync('./test/test.har')).encoder);
		assert.deepEqual(
			{"log":{"version":"1.2","creator":{"name":"WebInspector","version":"537.36"},"pages":[{"startedDateTime":"2014-06-13T22:37:29.053Z","id":"page_2","title":"http://example.com/","pageTimings":{"onContentLoad":125,"onLoad":124.00007247924805}}],"entries":[{"startedDateTime":"2014-06-13T22:37:29.053Z","time":120.00012397766113,"request":{"method":"GET","url":"http://example.com/","httpVersion":"HTTP/1.1","headers":[{"name":"Pragma","value":"no-cache"},{"name":"Accept-Encoding","value":"gzip,deflate,sdch"},{"name":"Host","value":"example.com"},{"name":"Accept-Language","value":"pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36"},{"name":"Accept","value":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"},{"name":"Cache-Control","value":"no-cache"},{"name":"Connection","value":"keep-alive"}],"queryString":[],"cookies":[],"headersSize":401,"bodySize":0},"response":{"status":200,"statusText":"OK","httpVersion":"HTTP/1.1","headers":[{"name":"Date","value":"Fri, 13 Jun 2014 22:37:28 GMT"},{"name":"x-ec-custom-error","value":"1"},{"name":"Last-Modified","value":"Fri, 09 Aug 2013 23:54:35 GMT"},{"name":"Server","value":"ECS (fll/0761)"},{"name":"Etag","value":"\"359670651\""},{"name":"X-Cache","value":"HIT"},{"name":"Content-Type","value":"text/html"},{"name":"Cache-Control","value":"max-age=604800"},{"name":"Accept-Ranges","value":"bytes"},{"name":"Content-Length","value":"1270"},{"name":"Expires","value":"Fri, 20 Jun 2014 22:37:28 GMT"}],"cookies":[],"content":{"size":1270,"mimeType":"text/html","compression":0},"redirectURL":"","headersSize":321,"bodySize":1270},"cache":{},"timings":{"blocked":0.9999999310821295,"dns":-1,"connect":-1,"send":0,"wait":119.00000018067658,"receive":0.00012386590242385864,"ssl":-1},"connection":"3555033","pageref":"page_2"}]}},
			harToHtml.readHar(fs.readFileSync('./test/test.har')).har
		);
	});
	
});