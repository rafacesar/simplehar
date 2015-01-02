/*jshint maxlen:false, globalstrict:true */
/*global it, describe */
'use strict';
var path = require('path'),
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
			expect(test).to.eql('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		});

		it('should return the default result parsing https', function() {
			var test = harToHtml({
				har:'./test/test-s.har',
				html:'./test/test.html',
				lng:false,
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.eql('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>https://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		});

		it('should return the default result parsing https with POST', function() {
			var test = harToHtml({
				har:'./test/test-ps.har',
				lng:false,
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.eql('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>https://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 129ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">130ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.00022777649298081674%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:0.029383176504130422%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:2.6092414828560187e-8%"></div>\n\t\t\t</div>\n\t\t\t<span class="renderstarted" data-toggle="tooltip" title="Start Render (121ms)" style="left:0.027560992340658216%"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (134ms)" style="left:0.030522073606242824%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (134ms)" style="left:0.030522073606242824%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Connection</dt><dd>keep-alive</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36</dd><dt>Cache-Control</dt><dd>max-age=0</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 11 Jul 2014 21:13:44 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/07A8)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 18 Jul 2014 21:13:44 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong>POST </strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="<strong>Start Time: </strong> <em> 7.296min</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 396.604ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 394.606ms</em></p><p class=\'clearfix bg-secondary\'><strong>SSL: </strong> <em> 266.734ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 209.790ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">1.27s</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:99.71101210194612%">99.71101210194612%</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.09033709550973855%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0.08988199786823568%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0.0607557533729221%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:0.0477852449331291%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00022779781239293275%"></div>\n\t\t\t</div>\n\t\t\t<span class="renderstarted" data-toggle="tooltip" title="Start Render (121ms)" style="left:0.027560992340658216%"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (134ms)" style="left:0.030522073606242824%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (134ms)" style="left:0.030522073606242824%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Origin</dt><dd>https://example.com</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36</dd><dt>Accept</dt><dd>*/*</dd><dt>Referer</dt><dd>https://example.com/</dd><dt>Connection</dt><dd>keep-alive</dd><dt>Content-Length</dt><dd>0</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 11 Jul 2014 21:21:02 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>EOS (lax004/2821)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 18 Jul 2014 21:21:02 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>2 requests</th><th colspan="3" class="text-right">2.48 KB (2.48 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(134ms)</span> <span title="Page Loaded" class="text-danger">134ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		});

		it('should return the default result parsing multiple sites in one harFile', function() {
			var test = harToHtml({
				har:'./test/test-m.har',
				lng:false,
				return:true
			});
			for(var i=0, ilen=test.length;i<ilen;i++)
				test[i] = test[i].replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.eql(['<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 7.879ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 2.904ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 113.033ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.231ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 114.411ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.262ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">238.72ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:3.0634940155198276%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:1.1291263722406286%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:43.94922229691293%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.08981687566275937%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:44.48501298622736%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.10184695733597696%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (257.20ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (257.19ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:35 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:35 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(257.20ms)</span> <span title="Page Loaded" class="text-danger">257.19ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>', '<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>https://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 0.506ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 0.696ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 369.123ms</em></p><p class=\'clearfix bg-secondary\'><strong>SSL: </strong> <em> 248.792ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.114ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 121.150ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.371ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">740.75ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.06830896754215358%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0.09395857029419628%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:49.83085073381275%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:33.58641161173152%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.015389758508105268%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:16.35500244174412%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.050090815292323745%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (508.60ms)" style="left:68.65996025000659%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (508.59ms)" style="left:68.6586084371251%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:45 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/07A8)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:45 GMT</dd></dl></div><div class="content"><pre class="pre-scrollable">&lt;!doctype html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Example Domain&lt;/title&gt;\n\n    &lt;meta charset=&quot;utf-8&quot; /&gt;\n    &lt;meta http-equiv=&quot;Content-type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; /&gt;\n    &lt;style type=&quot;text/css&quot;&gt;\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 50px;\n        background-color: #fff;\n        border-radius: 1em;\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        body {\n            background-color: #fff;\n        }\n        div {\n            width: auto;\n            margin: 0 auto;\n            border-radius: 0;\n            padding: 1em;\n        }\n    }\n    &lt;/style&gt;    \n&lt;/head&gt;\n\n&lt;body&gt;\n&lt;div&gt;\n    &lt;h1&gt;Example Domain&lt;/h1&gt;\n    &lt;p&gt;This domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.&lt;/p&gt;\n    &lt;p&gt;&lt;a href=&quot;http://www.iana.org/domains/example&quot;&gt;More information...&lt;/a&gt;&lt;/p&gt;\n&lt;/div&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(508.60ms)</span> <span title="Page Loaded" class="text-danger">508.59ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>']);
		});

		it('should return the default result translated', function() {
			var test = harToHtml({
				har:'./test/test.har',
				html:'./test/test.html',
				lng:'pt-BR',
				return:true
			});
			test = test.replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			expect(test).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Tamanho</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Tempo</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (comprimido)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Momento inicial: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Bloqueado: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Aguardando: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Recebendo: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Cabeçalhos</a></li><li><a href="#content">Conteúdo</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requisições</th><th colspan="3" class="text-right">1.24 KB (1.24 KB comprimido)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
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
			expect(test).to.be('<style>' + css + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>');
		});
		
		it('should return the frame content of the result from multiple sites', function() {
			var test = harToHtml({
				har:'./test/test-m.har',
				lng:false,
				frame:true,
				return:true
			});
			for(var i=0,ilen=test.length;i<ilen;i++)
				test[i] = test[i].replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			
			expect(test).to.eql(['<style>' + css  + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 7.879ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 2.904ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 113.033ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.231ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 114.411ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.262ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">238.72ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:3.0634940155198276%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:1.1291263722406286%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:43.94922229691293%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.08981687566275937%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:44.48501298622736%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.10184695733597696%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (257.20ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (257.19ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:35 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:35 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(257.20ms)</span> <span title="Page Loaded" class="text-danger">257.19ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>', '<style>' + css + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>https://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 0.506ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 0.696ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 369.123ms</em></p><p class=\'clearfix bg-secondary\'><strong>SSL: </strong> <em> 248.792ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.114ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 121.150ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.371ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">740.75ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.06830896754215358%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0.09395857029419628%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:49.83085073381275%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:33.58641161173152%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.015389758508105268%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:16.35500244174412%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.050090815292323745%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (508.60ms)" style="left:68.65996025000659%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (508.59ms)" style="left:68.6586084371251%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:45 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/07A8)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:45 GMT</dd></dl></div><div class="content"><pre class="pre-scrollable">&lt;!doctype html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Example Domain&lt;/title&gt;\n\n    &lt;meta charset=&quot;utf-8&quot; /&gt;\n    &lt;meta http-equiv=&quot;Content-type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; /&gt;\n    &lt;style type=&quot;text/css&quot;&gt;\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 50px;\n        background-color: #fff;\n        border-radius: 1em;\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        body {\n            background-color: #fff;\n        }\n        div {\n            width: auto;\n            margin: 0 auto;\n            border-radius: 0;\n            padding: 1em;\n        }\n    }\n    &lt;/style&gt;    \n&lt;/head&gt;\n\n&lt;body&gt;\n&lt;div&gt;\n    &lt;h1&gt;Example Domain&lt;/h1&gt;\n    &lt;p&gt;This domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.&lt;/p&gt;\n    &lt;p&gt;&lt;a href=&quot;http://www.iana.org/domains/example&quot;&gt;More information...&lt;/a&gt;&lt;/p&gt;\n&lt;/div&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(508.60ms)</span> <span title="Page Loaded" class="text-danger">508.59ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>']);
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
			expect(test).to.eql({css:css,js:js,html:'\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>'});
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
			expect(test).to.eql({css:css,js:js,html:'<style>' + css + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
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
			expect(test).to.eql({css:css,js:js,html:'\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
		});

		it('should return the frame of multiple sites content as obj without js and css embeded', function() {
			var test = harToHtml({
				har:'./test/test-m.har',
				lng:false,
				frame:true,
				frameContent:{
					js:false,
					css:false
				},
				return:true
			});
			for(var i=0,ilen=test.html.length;i<ilen;i++)
				test.html[i] = test.html[i].replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
			
			expect(test).to.eql({css:css,js:js,html:['\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 7.879ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 2.904ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 113.033ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.231ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 114.411ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.262ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">238.72ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:3.0634940155198276%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:1.1291263722406286%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:43.94922229691293%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.08981687566275937%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:44.48501298622736%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.10184695733597696%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (257.20ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (257.19ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:35 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:35 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(257.20ms)</span> <span title="Page Loaded" class="text-danger">257.19ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n', '\n<table class="table table-condensed table-hover sh-table">\n\t<caption>https://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 0.506ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 0.696ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 369.123ms</em></p><p class=\'clearfix bg-secondary\'><strong>SSL: </strong> <em> 248.792ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.114ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 121.150ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.371ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">740.75ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.06830896754215358%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0.09395857029419628%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:49.83085073381275%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:33.58641161173152%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.015389758508105268%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:16.35500244174412%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.050090815292323745%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (508.60ms)" style="left:68.65996025000659%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (508.59ms)" style="left:68.6586084371251%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:45 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/07A8)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:45 GMT</dd></dl></div><div class="content"><pre class="pre-scrollable">&lt;!doctype html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Example Domain&lt;/title&gt;\n\n    &lt;meta charset=&quot;utf-8&quot; /&gt;\n    &lt;meta http-equiv=&quot;Content-type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; /&gt;\n    &lt;style type=&quot;text/css&quot;&gt;\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 50px;\n        background-color: #fff;\n        border-radius: 1em;\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        body {\n            background-color: #fff;\n        }\n        div {\n            width: auto;\n            margin: 0 auto;\n            border-radius: 0;\n            padding: 1em;\n        }\n    }\n    &lt;/style&gt;    \n&lt;/head&gt;\n\n&lt;body&gt;\n&lt;div&gt;\n    &lt;h1&gt;Example Domain&lt;/h1&gt;\n    &lt;p&gt;This domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.&lt;/p&gt;\n    &lt;p&gt;&lt;a href=&quot;http://www.iana.org/domains/example&quot;&gt;More information...&lt;/a&gt;&lt;/p&gt;\n&lt;/div&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(508.60ms)</span> <span title="Page Loaded" class="text-danger">508.59ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n']});
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
			expect(test).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
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
		
		it('should return the default result parsing multiple sites in one harFile', function() {
			expect(harToHtml({
				har:'./test/test-m.har',
				html:'./test/test.html',
				lng:'pt-BR'
			})).to.be(undefined);
			
			//TODO:Test files content
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'example.com-page_2.html'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'example.com-page_3.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'script.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'style.css'));
			fs.rmdirSync(path.join('.', 'test', 'simpleharSrc'));
			fs.unlinkSync(path.join('.', 'test', 'example.com-page_2.html'));
			fs.unlinkSync(path.join('.', 'test', 'example.com-page_3.html'));
			
			expect(harToHtml({
				har:'./test/test-m.har',
				html:'./test/',
				lng:'pt-BR'
			})).to.be(undefined);
			
			//TODO:Test files content
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'example.com-page_2.html'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'test', 'example.com-page_3.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'script.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'));
			fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'style.css'));
			fs.rmdirSync(path.join('.', 'test', 'simpleharSrc'));
			fs.unlinkSync(path.join('.', 'test', 'example.com-page_2.html'));
			fs.unlinkSync(path.join('.', 'test', 'example.com-page_3.html'));
			
			expect(harToHtml({
				har:'./test/test-m.har',
				lng:'pt-BR'
			})).to.be(undefined);
			
			//TODO:Test files content
			expect(fs.existsSync(path.join('.', 'simpleharSrc'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'simpleharSrc', 'script.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'simpleharSrc', 'style.css'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'example.com-page_2.html'))).to.be.ok();
			expect(fs.existsSync(path.join('.', 'example.com-page_3.html'))).to.be.ok();
			
			fs.unlinkSync(path.join('.', 'simpleharSrc', 'script.js'));
			fs.unlinkSync(path.join('.', 'simpleharSrc', 'stupidtable.js'));
			fs.unlinkSync(path.join('.', 'simpleharSrc', 'style.css'));
			fs.rmdirSync(path.join('.', 'simpleharSrc'));
			fs.unlinkSync(path.join('.', 'example.com-page_2.html'));
			fs.unlinkSync(path.join('.', 'example.com-page_3.html'));
			
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
					expect(html).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
					done();
				}
			});
		});
	
		it('should return the default result with multiple pages', function(done) {
			harToHtml({
				har:'./test/test-m.har',
				lng:false,
				return:true,
				callback:function(html) {
					for(var i=0, ilen=html.length;i<ilen;i++)
						html[i] = html[i].replace(/id="top-\d+"/g, 'id="top-"').replace(/id="inside-\d+"/g, 'id="inside-"');
					expect(html).to.eql(['<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 7.879ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 2.904ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 113.033ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.231ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 114.411ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.262ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">238.72ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:3.0634940155198276%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:1.1291263722406286%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:43.94922229691293%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.08981687566275937%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:44.48501298622736%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.10184695733597696%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (257.20ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (257.19ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:35 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:35 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(257.20ms)</span> <span title="Page Loaded" class="text-danger">257.19ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>', '<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>https://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="https://example.com/">https://example.com/</a>\n\t\t\t<strong><strong class="text-success">/</strong><em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 0.506ms</em></p><p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> 0.696ms</em></p><p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> 369.123ms</em></p><p class=\'clearfix bg-secondary\'><strong>SSL: </strong> <em> 248.792ms</em></p><p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> 0.114ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 121.150ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> 0.371ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">740.75ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.06830896754215358%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0.09395857029419628%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:49.83085073381275%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:33.58641161173152%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0.015389758508105268%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:16.35500244174412%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.050090815292323745%"></div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (508.60ms)" style="left:68.65996025000659%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (508.59ms)" style="left:68.6586084371251%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip, deflate, sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4,de;<br>q=0.2</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Thu, 18 Dec 2014 16:36:45 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/07A8)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Thu, 25 Dec 2014 16:36:45 GMT</dd></dl></div><div class="content"><pre class="pre-scrollable">&lt;!doctype html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;Example Domain&lt;/title&gt;\n\n    &lt;meta charset=&quot;utf-8&quot; /&gt;\n    &lt;meta http-equiv=&quot;Content-type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; /&gt;\n    &lt;style type=&quot;text/css&quot;&gt;\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 50px;\n        background-color: #fff;\n        border-radius: 1em;\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        body {\n            background-color: #fff;\n        }\n        div {\n            width: auto;\n            margin: 0 auto;\n            border-radius: 0;\n            padding: 1em;\n        }\n    }\n    &lt;/style&gt;    \n&lt;/head&gt;\n\n&lt;body&gt;\n&lt;div&gt;\n    &lt;h1&gt;Example Domain&lt;/h1&gt;\n    &lt;p&gt;This domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.&lt;/p&gt;\n    &lt;p&gt;&lt;a href=&quot;http://www.iana.org/domains/example&quot;&gt;More information...&lt;/a&gt;&lt;/p&gt;\n&lt;/div&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(508.60ms)</span> <span title="Page Loaded" class="text-danger">508.59ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>']);
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
					expect(html).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Tamanho</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Tempo</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (comprimido)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Momento inicial: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Bloqueado: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Aguardando: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Recebendo: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Cabeçalhos</a></li><li><a href="#content">Conteúdo</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requisições</th><th colspan="3" class="text-right">1.24 KB (1.24 KB comprimido)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
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
					expect(html).to.be('<style>' + css + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>');
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
					expect(obj).to.eql({css:css, js:js, html:'<style>' + css + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>'});
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
					expect(obj).to.eql({css:css, js:js, html:'\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n<script>' + js + '</script>'});
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
					expect(obj).to.eql({css:css, js:js, html:'<style>' + css + '</style>\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
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
					expect(obj).to.eql({css:css, js:js, html:'\n<table class="table table-condensed table-hover sh-table">\n\t<caption>http://example.com/</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">Url</th>\n\t\t\t<th data-sort="int" class="stat">Status</th>\n\t\t\t<th data-sort="string">Type</th>\n\t\t\t<th data-sort="int" class="text-right">Size</th>\n\t\t\t<th data-sort="int" class="timeline text-center">Timeline</th>\n\t\t</tr>\n\t</thead>\n\t<tbody><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="http://example.com/">http://example.com/</a>\n\t\t\t<strong>/<em></em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="200 OK">200</td>\n\t<td class="type" data-toggle="tooltip" title="text/html">html</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="1270 Bytes" title="1270 Bytes (compressed)<br>1270 Bytes (normal)">1.24 KB</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="<strong>Start Time: </strong> <em> 0ms</em>" data-content="<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> 1ms</em></p><p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> 119ms</em></p><p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> < 1ms</em></p>">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">120ms</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:0">0</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:0.8064510859455214%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:0"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:95.96768598711243%"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:0.00009989179840567282%"></div>\n\t\t\t</div>\n\t\t\t<span class=\"renderstarted\" data-toggle=\"tooltip\" title=\"Start Render (121ms)\" style=\"left:97.58068858185382%\"></span>\n\t\t\t<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (125ms)" style="left:100%"></span>\n\t\t\t<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (124ms)" style="left:100%"></span>\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li><a href="#headers">Headers</a></li><li><a href="#content">Content</a></li>\n\t\t</ul>\n\t\t<div class="headers"><h3 class="headers-title"><small>Request Headers</small></h3><dl class="dl-horizontal"><dt>Pragma</dt><dd>no-cache</dd><dt>Accept-Encoding</dt><dd>gzip,deflate,sdch</dd><dt>Host</dt><dd>example.com</dd><dt>Accept-Language</dt><dd>pt-BR,pt;<br>q=0.8,en-US;<br>q=0.6,en;<br>q=0.4</dd><dt>User-Agent</dt><dd>Mozilla/5.0 (Windows NT 6.1;<br> WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36</dd><dt>Accept</dt><dd>text/html,application/xhtml+xml,application/xml;<br>q=0.9,image/webp,*/*;<br>q=0.8</dd><dt>Cache-Control</dt><dd>no-cache</dd><dt>Connection</dt><dd>keep-alive</dd></dl><h3 class="headers-title"><small>Response Headers</small></h3><dl class="dl-horizontal"><dt>Date</dt><dd>Fri, 13 Jun 2014 22:37:28 GMT</dd><dt>x-ec-custom-error</dt><dd>1</dd><dt>Last-Modified</dt><dd>Fri, 09 Aug 2013 23:54:35 GMT</dd><dt>Server</dt><dd>ECS (fll/0761)</dd><dt>Etag</dt><dd>"359670651"</dd><dt>X-Cache</dt><dd>HIT</dd><dt>Content-Type</dt><dd>text/html</dd><dt>Cache-Control</dt><dd>max-age=604800</dd><dt>Accept-Ranges</dt><dd>bytes</dd><dt>Content-Length</dt><dd>1270</dd><dt>Expires</dt><dd>Fri, 20 Jun 2014 22:37:28 GMT</dd></dl></div><div class="content"></div>\n\t</td>\n</tr></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<th>1 requests</th><th colspan="3" class="text-right">1.24 KB (1.24 KB compressed)</th><th class="text-center"><span title="DOMContentLoaded" class="text-success">(125ms)</span> <span title="Page Loaded" class="text-danger">124ms</span></th>\n\t\t</tr>\n\t</tfoot>\n</table>\n'});
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

		it('should generate files for multiple pages and not return anything', function(done) {
			harToHtml({
				har:'./test/test-m.har',
				html:'./test/test.html',
				lng:false,
				callback:function() {
					
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'script.js'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'style.css'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'example.com-page_2.html'))).to.be.ok();
					expect(fs.existsSync(path.join('.', 'test', 'example.com-page_3.html'))).to.be.ok();
					
					fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'script.js'));
					fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'stupidtable.js'));
					fs.unlinkSync(path.join('.', 'test', 'simpleharSrc', 'style.css'));
					fs.rmdirSync(path.join('.', 'test', 'simpleharSrc'));
					fs.unlinkSync(path.join('.', 'test', 'example.com-page_2.html'));
					fs.unlinkSync(path.join('.', 'test', 'example.com-page_3.html'));
					
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
		//Yellow point
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
		expect(harToHtml.readHar('./test/test.har')).to.eql({'log':{'version':'1.2','creator':{'name':'WebInspector','version':'537.36'},'pages':[{'startedDateTime':'2014-06-13T22:37:29.053Z','id':'page_2','title':'http://example.com/','pageTimings':{'onContentLoad':125,'onLoad':124.00007247924805,'_startRender':121.00012456724805}}],'entries':[{'startedDateTime':'2014-06-13T22:37:29.053Z','time':120.00012397766113,'request':{'method':'GET','url':'http://example.com/','httpVersion':'HTTP/1.1','headers':[{'name':'Pragma','value':'no-cache'},{'name':'Accept-Encoding','value':'gzip,deflate,sdch'},{'name':'Host','value':'example.com'},{'name':'Accept-Language','value':'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4'},{'name':'User-Agent','value':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'},{'name':'Accept','value':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'},{'name':'Cache-Control','value':'no-cache'},{'name':'Connection','value':'keep-alive'}],'queryString':[],'cookies':[],'headersSize':401,'bodySize':0},'response':{'status':200,'statusText':'OK','httpVersion':'HTTP/1.1','headers':[{'name':'Date','value':'Fri, 13 Jun 2014 22:37:28 GMT'},{'name':'x-ec-custom-error','value':'1'},{'name':'Last-Modified','value':'Fri, 09 Aug 2013 23:54:35 GMT'},{'name':'Server','value':'ECS (fll/0761)'},{'name':'Etag','value':'\"359670651\"'},{'name':'X-Cache','value':'HIT'},{'name':'Content-Type','value':'text/html'},{'name':'Cache-Control','value':'max-age=604800'},{'name':'Accept-Ranges','value':'bytes'},{'name':'Content-Length','value':'1270'},{'name':'Expires','value':'Fri, 20 Jun 2014 22:37:28 GMT'}],'cookies':[],'content':{'size':1270,'mimeType':'text/html','compression':0},'redirectURL':'','headersSize':321,'bodySize':1270},'cache':{},'timings':{'blocked':0.9999999310821295,'dns':-1,'connect':-1,'send':0,'wait':119.00000018067658,'receive':0.00012386590242385864,'ssl':-1},'connection':'3555033','pageref':'page_2'}]}});
		
		//callback
		
		harToHtml.readHar('./test/test.har', function(har) {
			expect(har).to.eql({'log':{'version':'1.2','creator':{'name':'WebInspector','version':'537.36'},'pages':[{'startedDateTime':'2014-06-13T22:37:29.053Z','id':'page_2','title':'http://example.com/','pageTimings':{'onContentLoad':125,'onLoad':124.00007247924805,'_startRender':121.00012456724805}}],'entries':[{'startedDateTime':'2014-06-13T22:37:29.053Z','time':120.00012397766113,'request':{'method':'GET','url':'http://example.com/','httpVersion':'HTTP/1.1','headers':[{'name':'Pragma','value':'no-cache'},{'name':'Accept-Encoding','value':'gzip,deflate,sdch'},{'name':'Host','value':'example.com'},{'name':'Accept-Language','value':'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4'},{'name':'User-Agent','value':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'},{'name':'Accept','value':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'},{'name':'Cache-Control','value':'no-cache'},{'name':'Connection','value':'keep-alive'}],'queryString':[],'cookies':[],'headersSize':401,'bodySize':0},'response':{'status':200,'statusText':'OK','httpVersion':'HTTP/1.1','headers':[{'name':'Date','value':'Fri, 13 Jun 2014 22:37:28 GMT'},{'name':'x-ec-custom-error','value':'1'},{'name':'Last-Modified','value':'Fri, 09 Aug 2013 23:54:35 GMT'},{'name':'Server','value':'ECS (fll/0761)'},{'name':'Etag','value':'\"359670651\"'},{'name':'X-Cache','value':'HIT'},{'name':'Content-Type','value':'text/html'},{'name':'Cache-Control','value':'max-age=604800'},{'name':'Accept-Ranges','value':'bytes'},{'name':'Content-Length','value':'1270'},{'name':'Expires','value':'Fri, 20 Jun 2014 22:37:28 GMT'}],'cookies':[],'content':{'size':1270,'mimeType':'text/html','compression':0},'redirectURL':'','headersSize':321,'bodySize':1270},'cache':{},'timings':{'blocked':0.9999999310821295,'dns':-1,'connect':-1,'send':0,'wait':119.00000018067658,'receive':0.00012386590242385864,'ssl':-1},'connection':'3555033','pageref':'page_2'}]}});
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
	
	//Yellow point
	it('should parse the har obj', function(done) {
		var result;
		expect(harToHtml.requestsToHtml).to.throwError();
		expect(harToHtml.requestsToHtml('')).to.be('');
		expect(harToHtml.requestsToHtml([])).to.be('');
		
		result = harToHtml.requestsToHtml([{a:1,b:'c',d:'test'}, {a:'testing',b:123,d:'another thing'}]);
		result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
		expect(result).to.eql('<tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');

		result = harToHtml.requestsToHtml([{
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
			status:1010,
			fullMimeType:'test/testing',
			mime:'tessssttt',
			size:10101,
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
		}, {}]);
		result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
		expect(result).to.eql('<tr class="top bg-danger" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong>abcfile.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">1010</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">tessssttt</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="10101" title="10101 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li>\n\t\t</ul>\n\t\t<div></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
		
		result = harToHtml.requestsToHtml([{
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
			status:1010,
			fullMimeType:'test/testing',
			mime:'css',
			size:10101,
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
		}, {}]);
		result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
		expect(result).to.eql('<tr class="top bg-danger" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong>abcfile.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">1010</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="10101" title="10101 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">rafael</pre></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
		
		result = harToHtml.requestsToHtml([{
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
			status:1010,
			fullMimeType:'test/testing',
			mime:'css',
			size:10101,
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
		}, {}]);
		result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
		expect(result).to.eql('<tr class="top bg-danger" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong>abcfile.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">1010</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="10101" title="10101 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    margin: 0;\n}\n</pre></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
		
		
		//callback
		harToHtml.requestsToHtml('', function(result) {
			expect(result).to.be('');
			
			harToHtml.requestsToHtml([], function(result) {
				expect(result).to.be('');
				
				harToHtml.requestsToHtml([{a:1,b:'c',d:'test'}, {a:'testing',b:123,d:'another thing'}], function(result) {
					result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
					expect(result).to.be('<tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
					
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
						status:1010,
						fullMimeType:'test/testing',
						mime:'tessssttt',
						size:10101,
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
						result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
						expect(result).to.eql('<tr class="top bg-danger" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong>abcfile.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">1010</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">tessssttt</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="10101" title="10101 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li>\n\t\t</ul>\n\t\t<div></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
						
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
							status:1010,
							fullMimeType:'test/testing',
							mime:'css',
							size:10101,
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
							result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
							expect(result).to.eql('<tr class="top bg-danger" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong>abcfile.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">1010</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="10101" title="10101 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">rafael</pre></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
							
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
								status:1010,
								fullMimeType:'test/testing',
								mime:'css',
								size:10101,
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
								result = result.replace(/id="(top|inside)-\d+"/g, 'id="$1-"');
								expect(result).to.eql('<tr class="top bg-danger" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">1.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="testingurl">testingurl</a>\n\t\t\t<strong>abcfile.asp<em>tests|tests</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="OK">1010</td>\n\t<td class="type" data-toggle="tooltip" title="test/testing">css</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="10101" title="10101 ([compressed])<br>918274 ([normal])">m9c9b</td>\n\t<td class="timeline" data-sort-value="1" data-toggle="popover" title="some text" data-content="more text">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">totalTime</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:123123">123123</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:a lot of content"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:lorem ipsum"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:dolor sit"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:amed ..."></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:blablabla"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:another text"></div>\n\t\t\t</div>\n\t\t\ttest text\n\t\t\tDOM loaded\n\t\t\tfull loaded\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t<li></li><li><a href=\"#parsedcontent\">[Parsed Content]</a></li>\n\t\t</ul>\n\t\t<div></div><div class=\"parsedcontent hidden\"><pre class=\"pre-scrollable\">* {\n    margin: 0;\n}\n</pre></div>\n\t</td>\n</tr><tr class="top bg-" id="top-">\n\t<td class="url">\n\t\t<div>\n\t\t\t<b class="order">2.</b>\n\t\t\t<i class="glyphicon glyphicon-chevron-down" data-toggle-sign="glyphicon glyphicon-chevron-up"></i>\n\t\t\t<a href="{fullUrl}">{fullUrl}</a>\n\t\t\t<strong>{method}{fileName}<em>{params}</em></strong>\n\t\t</div>\n\t</td>\n\t<td class="status" data-toggle="tooltip" title="{fullStatus}">{status}</td>\n\t<td class="type" data-toggle="tooltip" title="{fullMimeType}">{mime}</td>\n\t<td class="size" data-toggle="tooltip" data-sort-value="{size}" title="{size} ([compressed])<br>{fullSize} ([normal])">{sizeToShow}</td>\n\t<td class="timeline" data-sort-value="2" data-toggle="popover" title="{progressStart}" data-content="{progressContent}">\n\t\t<div>\n\t\t\t<div class="progress">\n\t\t\t\t<span class="totalTime">{totalTime}</span>\n\t\t\t\t<div class="progress-bar progress-bar-space" style="width:{startPosition}">{startPosition}</div>\n\t\t\t\t<div class="progress-bar progress-bar-warning" style="width:{blockedWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-last" style="width:{dnsWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-info" style="width:{connectWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-secondary" style="width:{sslWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-primary" style="width:{sendWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-danger" style="width:{waitWidth}"></div>\n\t\t\t\t<div class="progress-bar progress-bar-success" style="width:{receiveWidth}"></div>\n\t\t\t</div>\n\t\t\t{renderstarted}\n\t\t\t{domloaded}\n\t\t\t{windowloaded}\n\t\t</div>\n\t</td>\n</tr>\n<tr class="inside" id="inside-">\n\t<td colspan="5">\n\t\t<ul class="nav nav-tabs">\n\t\t\t{tabs}\n\t\t</ul>\n\t\t{tabContainers}\n\t</td>\n</tr>');
								
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
		expect(harToHtml.fullHtml('', {})).to.be('{style}\n<table class="table table-condensed table-hover sh-table">\n\t<caption>undefined</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int" class="stat">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tundefined\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		expect(harToHtml.fullHtml('test', {title:'titleContent', info:'some information'})).to.be('{style}\n<table class="table table-condensed table-hover sh-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int" class="stat">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>test</tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		expect(harToHtml.fullHtml('', {title:'titleContent', info:'some information'})).to.be('{style}\n<table class="table table-condensed table-hover sh-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int" class="stat">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
		
		//callback
		
		harToHtml.fullHtml('', {}, function(result) {
			expect(result).to.be('{style}\n<table class="table table-condensed table-hover sh-table">\n\t<caption>undefined</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int" class="stat">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tundefined\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
			
			harToHtml.fullHtml('test', {title:'titleContent', info:'some information'}, function(result) {
				expect(result).to.be('{style}\n<table class="table table-condensed table-hover sh-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int" class="stat">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>test</tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
				
				harToHtml.fullHtml('', {title:'titleContent', info:'some information'}, function(result) {
					expect(result).to.be('{style}\n<table class="table table-condensed table-hover sh-table">\n\t<caption>titleContent</caption>\n\t<thead>\n\t\t<tr>\n\t\t\t<th data-sort="url">[Url]</th>\n\t\t\t<th data-sort="int" class="stat">[Status]</th>\n\t\t\t<th data-sort="string">[Type]</th>\n\t\t\t<th data-sort="int" class="text-right">[Size]</th>\n\t\t\t<th data-sort="int" class="timeline text-center">[Timeline]</th>\n\t\t</tr>\n\t</thead>\n\t<tbody></tbody>\n\t<tfoot>\n\t\t<tr>\n\t\t\tsome information\n\t\t</tr>\n\t</tfoot>\n</table>\n{script}');
					
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
		expect(harToHtml.completePage('')).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\t\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.completePage('testContent')).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\ttestContent\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
		expect(harToHtml.completePage('{script}testContent{style}')).to.be('<!doctype html>\n<html lang="en" style="height:100%;">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>SimpleHar</title>\n\t<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />\n\t<link rel="stylesheet" href="simpleharSrc/style.css" />\n</head>\n<body style="height:100%;">\n\t<div class="container sh-container">\n\t\ttestContent\n\t</div>\n\t<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\n\t<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>\n\t\n\t<script src="simpleharSrc/stupidtable.js"></script>\n\t<script src="simpleharSrc/script.js"></script>\n</body>\n</html>');
	});

});