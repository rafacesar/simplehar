jQuery.create = function(e) {return $(document.createElement(e));};

(function(har, w, doc, $) {
	'use strict';
	$('title').text($('title').text() + ' - ' + har.pages[0].title);
	
	var $container = $('.container'),
		url, filename, params;
	
	
	var $table = $.create('table').addClass('table table-condensed table-hover');
	
	$table.html('<thead><tr><th>Url</th><th>Status</th><th>Mime Type</th><th>Size</th><th>Tempo</th></thead><tbody></tbody>');
	$table = $table.find('tbody');
	
	for(var i=0;i<har.entries.length;i++) {
		
		$table.append(entrieToHtml(har.entries[i]));
	}
	
	$container.append($table.parent());
	
	
	$container.find('.inside').removeClass('hidden').find('dt').each(function() {
		var $this = $(this);
		if($this.css('width', 'auto').width() > 160)
			$this.attr('title', $this.text());
		$this.css('width', '');
	}).end().each(function() {
		//TODO: Jogar isso pro CSS
		var $this = $(this),
			widthDefault = $this.find('div').eq(0).width() + 20;
		
		$this.find('div').css('width', widthDefault);
		
	}).addClass('hidden');
	
	
	$container.find('.nav').find('a').click(function() {
		
		var $this = $(this);
		
		$this.parent().parent().find('.active').removeClass('active');
		$this.parent().addClass('active');
		
		
		$this.parents('.inside').find('div').addClass('hidden');
		$this.parents('.inside').find('div.' + $this.attr('href').substr(1)).removeClass('hidden');
		
		
		return false;
	});
	
})(har.log, window, document, jQuery);


function entrieToHtml(entrie) {
	'use strict';
	
	var url = entrie.request.url.split('/'),
		filename = url[url.length - 1],
		size = entrie.response.bodySize,
		formatedSize = Math.round(parseInt(size,10) / 1024),
		plusSign = 'glyphicon-arrow-right',
		minusSign = 'glyphicon-arrow-down',
		params, toggle, objParser;
	
	filename = filename.split('#')[0].split('?')[0];
	params = url[url.length - 1].substr(filename.length);
	
	objParser = function(arr, filter) {
		if(arr.length) {
			var dl = '<dl class="dl-horizontal">';
			for(var i=0,ilen=arr.length;i<ilen;i++) {
				if(!filter || !filter.length || filter.indexOf(arr[i].name) == -1)
					dl += '<dt>' + arr[i].name + '</dt><dd>' + arr[i].value.split(';').join(';<br>') + '</dd>';
			}
			dl += '</dl>';
			return dl;
		}
		return '';
	};
	
	toggle = function(evt) {
		var $this = $(this);
		if($this.hasClass('opened')) {
			$this.removeClass('opened');
			$this.find('i').removeClass(minusSign).addClass(plusSign);
			$this.next().addClass('hidden');
		}
		else {
			$this.addClass('opened');
			$this.find('i').removeClass(plusSign).addClass(minusSign);
			$this.next().removeClass('hidden');
		}
		return false;
	};
	
	var obj = {
		plusSign:plusSign,
		fullUrl:url.join("/"),
		filename:filename || '/',
		params:params,
		responseStatus:entrie.response.status,
		responseTextStatus:entrie.response.statusText,
		mimeType:entrie.response.content.mimeType.split(";")[0],
		size:size,
		formatedSize:formatedSize,
		responseHeaders:objParser(entrie.response.headers, ['cookie']),
		requestHeaders:objParser(entrie.request.headers, ['cookie']),
		responseCookies:objParser(entrie.response.cookies),
		requestCookies:objParser(entrie.request.cookies)
	};
	
	
	
	var template = 
	'<tr class="top">' + 
		'<td class="url">' + 
			'<i class="glyphicon %plusSign%"></i>' + 
			'<a>%fullUrl%</a>' + 
			'<strong>%filename%<em>%params%</em></strong>' + 
		'</td>' + 
		'<td class="status">%responseStatus% %responseTextStatus%</td>' + 
		'<td class="type">%mimeType%</td>' + 
		'<td class="size" title="%size% Bytes">%formatedSize% KB</td>' + 
	'</tr>' + 
	'<tr class="inside hidden">' + 
		'<td colspan="5">' + 
			'<ul class="nav nav-tabs">' + 
				'<li class="active">' + 
					'<a href="#headers">Headers</a>' + 
				'</li>' + 
				'<li>' + 
					'<a href="#cookies">Cookies</a>' + 
				'</li>' + 
				'<li>' + 
					'<a href="#content">Content</a>' + 
				'</li>' + 
			'</ul>' + 
			'<div class="headers">' + 
				'<h3><small>Response Headers</small></h3>%responseHeaders%' + 
				'<h3><small>Request Headers</small></h3>%requestHeaders%' + 
			'</div>' + 
			'<div class="cookies hidden">' + 
				'<h3><small>Response Cookies</small></h3>%responseCookies%' + 
				'<h3><small>Request Cookies</small></h3>%requestCookies%' + 
			'</div>' + 
			'<div class="content hidden"><pre></pre></div>' + 
		'</td>' + 
	'</tr>';
	
	
	var result = $(templateParser(template, obj)).filter('.top').click(toggle).end();
	
	
	if(obj.mimeType.split('/')[0] == 'image')
		result.find('.content pre').replaceWith($.create('img').attr('src', 'data:' + obj.mimeType + ';base64,' + entrie.response.content.text));
	else
		result.find('.content pre').text(entrie.response.content.text);
	
	
	
	
	return result;
}

function templateParser(html, obj) {
	var prop, re;
	for(prop in obj) {
		re = new RegExp("%" + prop + "%", 'g');
		html = html.replace(re,obj[prop]);
	}
	return html;
}