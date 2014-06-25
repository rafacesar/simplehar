var assert = require('assert'),
	path = require('path'),
	fs = require('fs'),
	expect = require('expect.js'),
	harToHtml = require('../lib/simplehar.js');

describe('Library', function() {
	
	describe('SimpleHar Sync', function() {
		var css = fs.readFileSync(path.join(__filename, '..', '..', 'src', 'style.css')).toString(),
			js = fs.readFileSync(path.join(__filename, '..', '..', 'src', 'script.js')).toString();
		
		it('should return the default result', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		});

		it('should return the default result translated', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:'pt-BR',
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Tamanho</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Tempo</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (comprimido)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Momento inicial:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Bloqueado: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Enviando: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Aguardando: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Recebendo: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Cabeçalhos</a></li><li><a href="#content">Conteúdo</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requisições</th><th colspan="3" class="text-right">1.24 KB (1.24 KB comprimido)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		});
		
		it('should return the frame content of the result', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.be('<style>' + css + '</style>\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>');
		});
		
		it('should return the frame content as obj without css embeded', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					css:false
				},
				return:true
			});
			test.html = test.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.eql({css:css,js:js,html:'\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>'});
		});
		
		it('should return the frame content as obj without js embeded', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					js:false
				},
				return:true
			});
			test.html = test.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.eql({css:css,js:js,html:'<style>' + css + '</style>\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
		});
		
		it('should return the frame content as obj without js and css embeded', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					js:false,
					css:false
				},
				return:true
			});
			test.html = test.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.eql({css:css,js:js,html:'\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
		});
		
		it('should return the frame part as string', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frameContent:{
					css:false
				},
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		});
		
		it('should generate files and not return anything', function() {
			expect(harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false
			})).to.be(undefined);
			
			//TODO:Test files content
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'script.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'style.css'));
			fs.rmdirSync(path.join('.', 'test', 'simpleharSrc'));
			fs.unlinkSync(path.join('.', 'test', 'test.html'));
		});
		
		it('should generate files translated and not return anything', function() {
			expect(harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:'pt-BR'
			})).to.be(undefined);
			
			//TODO:Test files content
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'script.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'style.css'));
			fs.rmdirSync(path.join('.', 'test', 'simpleharSrc'));
			fs.unlinkSync(path.join('.', 'test', 'test.html'));
		});
		
		it('should generate the content with css and js embeded', function() {
			expect(harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frameContent:{
					css:false
				}
			})).to.be(undefined);
			
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'test.html'));
		});
		
		it('should generate the frame content', function() {
			expect(harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true
			})).to.be(undefined);
			
			//TODO:Prepare to not generate content when not asked
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.not.be.ok();
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.not.be.ok();
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.not.be.ok();
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.not.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'test.html'));
		});
		
		it('should generate the frame content without css and js embeded', function() {
			expect(harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					css:false,
					js:false
				}
			})).to.be(undefined);
			
			//TODO:Prepare to not generate content when not asked
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.not.be.ok();
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.not.be.ok();
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.not.be.ok();
			// expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.not.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'test.html'));
		});
	});

	describe('SimpleHar Async', function() {
		var css = fs.readFileSync(path.join(__filename, '..', '..', 'src', 'style.css')).toString(),
			js = fs.readFileSync(path.join(__filename, '..', '..', 'src', 'script.js')).toString();
		
		//TODO:Test files content
		it('should return the default result', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				return:true,
				callback:function(html) {
					html = html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(html).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
					done();
				}
			});
		});
		
		it('should return the default result translated', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:'pt-BR',
				return:true,
				callback:function(html) {
					html = html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(html).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Tamanho</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Tempo</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (comprimido)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Momento inicial:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Bloqueado: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Enviando: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Aguardando: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Recebendo: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Cabeçalhos</a></li><li><a href="#content">Conteúdo</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requisições</th><th colspan="3" class="text-right">1.24 KB (1.24 KB comprimido)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
					done();
				}
			});
		});
		
		it('should return the frame content of the result', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				return:true,
				callback:function(html) {
					html = html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(html).to.be('<style>' + css + '</style>\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>');
					done();
				}
			});
		});

		it('should return the frame content as obj', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{},
				return:true,
				callback:function(obj) {
					obj.html = obj.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(obj).to.eql({css:css, js:js, html:'<style>' + css + '</style>\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>'});
					done();
				}
			});
		});
		
		it('should return the frame content as obj without css embeded', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					css:false
				},
				return:true,
				callback:function(obj) {
					obj.html = obj.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(obj).to.eql({css:css, js:js, html:'\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>'});
					done();
				}
			});
		});

		it('should return the frame content as obj without js embeded', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					js:false
				},
				return:true,
				callback:function(obj) {
					obj.html = obj.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(obj).to.eql({css:css, js:js, html:'<style>' + css + '</style>\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
					done();
				}
			});
		});
		
		it('should return the frame content as obj without js and css embeded', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{
					js:false,
					css:false
				},
				return:true,
				callback:function(obj) {
					obj.html = obj.html.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(obj).to.eql({css:css, js:js, html:'\n<table class="table table-condensed table-hover har-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong><span class="order">1.</span> /<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time:</strong> <em>0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~0ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~0ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">118ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:-0.8064511415244168%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100.80639269055209%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center">(125ms) 124ms</th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
					done();
				}
			});
		});
		
		it('should generate files and not return anything', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				callback:function() {
					
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
					
					fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'script.js'));
					fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'));
					fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'style.css'));
					fs.rmdirSync(path.join('.', 'test', 'simpleharSrc'));
					fs.unlinkSync(path.join('.', 'test', 'test.html'));
					
					done();
				}
			});
		});
		
		it('should generate the frame content', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				callback:function() {
					
					expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
					
					fs.unlinkSync(path.join('.', 'test', 'test.html'));
					
					done();
				}
			});
		});
		
		it('should generate the frame content with js and css embeded', function(done) {
			harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:false,
				frame:true,
				frameContent:{},
				callback:function() {
					
					expect(fs.existsSync(path.join('.', 'test', 'test.html'))).to.be.ok();
					
					fs.unlinkSync(path.join('.', 'test', 'test.html'));
					
					done();
				}
			});
		});
		
	});
	
	
	
	
	
	it('should read har file', function(done) {
		expect(harToHtml.readHar).to.throwError();
		expect(harToHtml.readHar('./test/test.har')).to.eql({"log":{"version":"1.2","creator":{"name":"WebInspector","version":"537.36"},"pages":[{"startedDateTime":"2014-06-13T22:37:29.053Z","id":"page_2","title":"http://example.com/","pageTimings":{"onContentLoad":125,"onLoad":124.00007247924805}}],"entries":[{"startedDateTime":"2014-06-13T22:37:29.053Z","time":120.00012397766113,"request":{"method":"GET","url":"http://example.com/","httpVersion":"HTTP/1.1","headers":[{"name":"Pragma","value":"no-cache"},{"name":"Accept-Encoding","value":"gzip,deflate,sdch"},{"name":"Host","value":"example.com"},{"name":"Accept-Language","value":"pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36"},{"name":"Accept","value":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"},{"name":"Cache-Control","value":"no-cache"},{"name":"Connection","value":"keep-alive"}],"queryString":[],"cookies":[],"headersSize":401,"bodySize":0},"response":{"status":200,"statusText":"OK","httpVersion":"HTTP/1.1","headers":[{"name":"Date","value":"Fri, 13 Jun 2014 22:37:28 GMT"},{"name":"x-ec-custom-error","value":"1"},{"name":"Last-Modified","value":"Fri, 09 Aug 2013 23:54:35 GMT"},{"name":"Server","value":"ECS (fll/0761)"},{"name":"Etag","value":"\"359670651\""},{"name":"X-Cache","value":"HIT"},{"name":"Content-Type","value":"text/html"},{"name":"Cache-Control","value":"max-age=604800"},{"name":"Accept-Ranges","value":"bytes"},{"name":"Content-Length","value":"1270"},{"name":"Expires","value":"Fri, 20 Jun 2014 22:37:28 GMT"}],"cookies":[],"content":{"size":1270,"mimeType":"text/html","compression":0},"redirectURL":"","headersSize":321,"bodySize":1270},"cache":{},"timings":{"blocked":0.9999999310821295,"dns":-1,"connect":-1,"send":0,"wait":119.00000018067658,"receive":0.00012386590242385864,"ssl":-1},"connection":"3555033","pageref":"page_2"}]}});
		
		//callback
		
		harToHtml.readHar('./test/test.har', function(har) {
			expect(har).to.eql({"log":{"version":"1.2","creator":{"name":"WebInspector","version":"537.36"},"pages":[{"startedDateTime":"2014-06-13T22:37:29.053Z","id":"page_2","title":"http://example.com/","pageTimings":{"onContentLoad":125,"onLoad":124.00007247924805}}],"entries":[{"startedDateTime":"2014-06-13T22:37:29.053Z","time":120.00012397766113,"request":{"method":"GET","url":"http://example.com/","httpVersion":"HTTP/1.1","headers":[{"name":"Pragma","value":"no-cache"},{"name":"Accept-Encoding","value":"gzip,deflate,sdch"},{"name":"Host","value":"example.com"},{"name":"Accept-Language","value":"pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36"},{"name":"Accept","value":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"},{"name":"Cache-Control","value":"no-cache"},{"name":"Connection","value":"keep-alive"}],"queryString":[],"cookies":[],"headersSize":401,"bodySize":0},"response":{"status":200,"statusText":"OK","httpVersion":"HTTP/1.1","headers":[{"name":"Date","value":"Fri, 13 Jun 2014 22:37:28 GMT"},{"name":"x-ec-custom-error","value":"1"},{"name":"Last-Modified","value":"Fri, 09 Aug 2013 23:54:35 GMT"},{"name":"Server","value":"ECS (fll/0761)"},{"name":"Etag","value":"\"359670651\""},{"name":"X-Cache","value":"HIT"},{"name":"Content-Type","value":"text/html"},{"name":"Cache-Control","value":"max-age=604800"},{"name":"Accept-Ranges","value":"bytes"},{"name":"Content-Length","value":"1270"},{"name":"Expires","value":"Fri, 20 Jun 2014 22:37:28 GMT"}],"cookies":[],"content":{"size":1270,"mimeType":"text/html","compression":0},"redirectURL":"","headersSize":321,"bodySize":1270},"cache":{},"timings":{"blocked":0.9999999310821295,"dns":-1,"connect":-1,"send":0,"wait":119.00000018067658,"receive":0.00012386590242385864,"ssl":-1},"connection":"3555033","pageref":"page_2"}]}});
			done();
		});
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
	
	it('should parse the har obj', function(done) {
		expect(harToHtml.requestsToHtml).to.throwError();
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
		
		
		//callback
		harToHtml.requestsToHtml('', function(result) {
			expect(result).to.be('');
			
			harToHtml.requestsToHtml([], function(result) {
				expect(result).to.be('');
				
				harToHtml.requestsToHtml([{a:1,b:'c',d:'test'}, {a:'testing',b:123,d:'another thing'}], function(result) {
					expect(result).to.be('<tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
					
					harToHtml.requestsToHtml([{
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
					}, {}], function(result) {
						expect(result).to.be('<tr class="top bg-a" id="top-1">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon x" data-toggle-sign="glyphicon toggle"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong><span class="order">92.</span>abc file.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">520</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">tessssttt</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="4161" title="4161 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="92" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-1">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li>\n\t\t</ul>\n\t\t<div></div>\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
						
						harToHtml.requestsToHtml([{
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
						}, {}], function(result) {
							expect(result).to.be('<tr class="top bg-a" id="top-1">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon x" data-toggle-sign="glyphicon toggle"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong><span class="order">92.</span>abc file.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">520</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="4161" title="4161 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="92" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-1">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">rafael</pre></div>\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
							
							harToHtml.requestsToHtml([{
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
							}, {}], function(result) {
								expect(result).to.be('<tr class="top bg-a" id="top-1">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon x" data-toggle-sign="glyphicon toggle"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong><span class="order">92.</span>abc file.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">520</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="4161" title="4161 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="92" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-1">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    margin: 0;\n}\n</pre></div>\n\t</td>\n</tr><tr class="top bg-{bgstatus}" id="top-{rId}">\n\t<td class="url">\n\t\t<div>\n\t\t\t\n\t\t\t<i class="glyphicon {sign}" data-toggle-sign="glyphicon {toggleSign}"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong><span class="order">{order}.</span>{method} {fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="{order}" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-{rId}">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
								
								done();
							});
						});
					});
					
				});
			});
		});
		
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
	
	it('should insert informations in the html', function(done) {
		expect(harToHtml.fullHtml).to.throwError();
		expect(harToHtml.fullHtml).withArgs('').to.throwError();
		expect(harToHtml.fullHtml('', {})).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>undefined</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tundefined\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		expect(harToHtml.fullHtml('test', {title:'titleContent', info:'some information'})).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>test</tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		expect(harToHtml.fullHtml('', {title:'titleContent', info:'some information'})).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		
		//callback
		
		harToHtml.fullHtml('', {}, function(result) {
			expect(result).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>undefined</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tundefined\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
			
			harToHtml.fullHtml('test', {title:'titleContent', info:'some information'}, function(result) {
				expect(result).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>test</tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
				
				harToHtml.fullHtml('', {title:'titleContent', info:'some information'}, function(result) {
					expect(result).to.be('{style}\n<table class="table table-condensed table-hover har-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
					
					done();
				});
			});
		});
		
		
		
	});
	
	it('should translate the content', function(done) {
		expect(harToHtml.translate('', '')).to.be('');
		expect(harToHtml.translate('')).to.be('');
		expect(harToHtml.translate).to.throwError();
		expect(harToHtml.translate('[Size]', '')).to.be('Size');
		expect(harToHtml.translate('[Size]', 'en-US')).to.be('Size');
		expect(harToHtml.translate('[Size]', 'pt-BR')).to.be('Tamanho');
		expect(harToHtml.translate('[Size]|[Content]')).to.be('Size|Content');
		expect(harToHtml.translate('[Size]|[Content]', '')).to.be('Size|Content');
		expect(harToHtml.translate('[Size]|[Content]', 'en-US')).to.be('Size|Content');
		expect(harToHtml.translate('[Size]|[Content]', 'pt-BR')).to.be('Tamanho|Conteúdo');
		expect(harToHtml.translate('[Test]', '')).to.be('Test');
		expect(harToHtml.translate('[Test]', 'pt-BR')).to.be('Test');
		
		
		//callback
		
		harToHtml.translate('[Size]', '', function(result) {
			expect(result).to.be('Size');
			
			harToHtml.translate('[Size]', 'en-US', function(result) {
				expect(result).to.be('Size');
				
				harToHtml.translate('[Size]', 'pt-BR', function(result) {
					expect(result).to.be('Tamanho');
					
					harToHtml.translate('[Size]|[Content]', undefined, function(result) {
						expect(result).to.be('Size|Content');
						
						harToHtml.translate('[Size]|[Content]', '', function(result) {
							expect(result).to.be('Size|Content');
							
							harToHtml.translate('[Size]|[Content]', 'en-US', function(result) {
								expect(result).to.be('Size|Content');
								
								harToHtml.translate('[Size]|[Content]', 'pt-BR', function(result) {
									expect(result).to.be('Tamanho|Conteúdo');
									
									harToHtml.translate('[Test]', '', function(result) {
										expect(result).to.be('Test');
										
										harToHtml.translate('[Test]', 'pt-BR', function(result) {
											expect(result).to.be('Test');
											
											done();
										});
									});
								});
							});
						});
					});
				});
			});
		});
		
	});
	
	it('should create html frame part', function() {
		var css = fs.readFileSync(path.join(__filename, '..', '..', 'src', 'style.css')),
			js = fs.readFileSync(path.join(__filename, '..', '..', 'src', 'script.js'));
		
		expect(harToHtml.makeFrame).to.throwError();
		expect(harToHtml.makeFrame('')).to.be('');
		expect(harToHtml.makeFrame('{style}')).to.be('<style>' + css.toString() + '</style>');
		expect(harToHtml.makeFrame('{script}')).to.be('<script>' + js.toString() + '</script>');
		expect(harToHtml.makeFrame('{script}test{style}')).to.be('<script>' + js.toString() + '</script>test<style>' + css.toString() + '</style>');
		
		expect(harToHtml.makeFrame('{script}test{style}', {})).to.eql({
			css:css.toString(),
			js:js.toString(),
			html:'<script>' + js.toString() + '</script>test<style>' + css.toString() + '</style>'
		});
		expect(harToHtml.makeFrame('{script}test{style}', {css:false})).to.eql({
			css:css.toString(),
			js:js.toString(),
			html:'<script>' + js.toString() + '</script>test'
		});
		expect(harToHtml.makeFrame('{script}test{style}', {js:false})).to.eql({
			css:css.toString(),
			js:js.toString(),
			html:'test<style>' + css.toString() + '</style>'
		});
		expect(harToHtml.makeFrame('{script}test{style}', {js:false, css:false})).to.eql({
			css:css.toString(),
			js:js.toString(),
			html:'test'
		});
		expect(harToHtml.makeFrame('', {js:false, css:false})).to.eql({
			css:css.toString(),
			js:js.toString(),
			html:''
		});
	});

	it('should copy the source files to simpleharSrc folder', function() {
		harToHtml.copySrc('.');
		
		
		expect(fs.existsSync(path.join('.', 'simpleharSrc'))).to.be.ok();
		expect(fs.existsSync(path.join('.', 'simpleharSrc', 'script.js'))).to.be.ok();
		expect(fs.existsSync(path.join('.', 'simpleharSrc', 'style.css'))).to.be.ok();
		expect(fs.existsSync(path.join('.', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
		
		
		
		fs.unlinkSync(path.join('.', 'simpleharSrc', 'script.js'));
		fs.unlinkSync(path.join('.', 'simpleharSrc', 'stupidtable.js'));
		fs.unlinkSync(path.join('.', 'simpleharSrc', 'style.css'));
		fs.rmdirSync(path.join('.', 'simpleharSrc'));
		
		expect(fs.existsSync(path.join('.', 'simpleharSrc'))).to.not.be.ok();
		expect(fs.existsSync(path.join('.', 'simpleharSrc', 'script.js'))).to.not.be.ok();
		expect(fs.existsSync(path.join('.', 'simpleharSrc', 'style.css'))).to.not.be.ok();
		expect(fs.existsSync(path.join('.', 'simpleharSrc', 'stupidtable.js'))).to.not.be.ok();
		
		
		harToHtml.copySrc('..');
		
		
		expect(fs.existsSync(path.join('..', 'simpleharSrc'))).to.be.ok();
		expect(fs.existsSync(path.join('..', 'simpleharSrc', 'script.js'))).to.be.ok();
		expect(fs.existsSync(path.join('..', 'simpleharSrc', 'style.css'))).to.be.ok();
		expect(fs.existsSync(path.join('..', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
		
		
		
		fs.unlinkSync(path.join('..', 'simpleharSrc', 'script.js'));
		fs.unlinkSync(path.join('..', 'simpleharSrc', 'stupidtable.js'));
		fs.unlinkSync(path.join('..', 'simpleharSrc', 'style.css'));
		fs.rmdirSync(path.join('..', 'simpleharSrc'));
		
		expect(fs.existsSync(path.join('..', 'simpleharSrc'))).to.not.be.ok();
		expect(fs.existsSync(path.join('..', 'simpleharSrc', 'script.js'))).to.not.be.ok();
		expect(fs.existsSync(path.join('..', 'simpleharSrc', 'style.css'))).to.not.be.ok();
		expect(fs.existsSync(path.join('..', 'simpleharSrc', 'stupidtable.js'))).to.not.be.ok();
		
	});


	it('should prepare the final html page', function() {
		expect(harToHtml.completePage).to.throwError();
		expect(harToHtml.completePage('')).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\t\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.completePage('testContent')).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\ttestContent\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.completePage('{script}testContent{style}')).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container">\n\t\ttestContent\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
	});

});