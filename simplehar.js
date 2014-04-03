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
	
	
})(har.log, window, document, jQuery);


function entrieToHtml(entrie) {
	'use strict';
	
	var url = entrie.request.url.split('/'),
		filename = url[url.length - 1],
		size = entrie.response.bodySize,
		formatedSize = Math.round(parseInt(size,10) / 1024),
		plusSign = 'glyphicon-arrow-right',
		minusSign = 'glyphicon-arrow-down',
		params, toggle, headers;
	
	filename = filename.split('#')[0].split('?')[0];
	params = url[url.length - 1].substr(filename.length);
	
	headers = function(arr) {
		var dl = '<dl class="dl-horizontal">';
		for(var i=0,ilen=arr.length;i<ilen;i++) {
			dl += '<dt>' + arr[i].name + '</dt><dd>' + arr[i].value + '</dd>';
		}
		dl += '</dl>';
		return dl;
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
		filename:filename,
		params:params,
		responseStatus:entrie.response.status,
		responseTextStatus:entrie.response.statusText,
		mimeType:entrie.response.content.mimeType.split(";")[0],
		size:size,
		formatedSize:formatedSize,
		responseHeaders:headers(entrie.response.headers),
		requestHeaders:headers(entrie.request.headers)
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
					'<a href="#">Headers</a>' + 
				'</li>' + 
			'</ul>' + 
			'<h3><small>Response Headers</small></h3>%responseHeaders%' + 
			'<h3><small>Request Headers</small></h3>%requestHeaders%' + 
		'</td>' + 
	'</tr>';
	
	
	return $(templateParser(template, obj)).filter('.top').click(toggle).end();
}

function templateParser(html, obj) {
	var prop, re;
	for(prop in obj) {
		re = new RegExp("%" + prop + "%", 'g');
		html = html.replace(re,obj[prop]);
	}
	return html;
}