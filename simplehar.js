jQuery.create = function(e) {return $(document.createElement(e));};

(function(har, w, doc, $) {
	'use strict';
	$('title').text($('title').text() + ' - ' + har.pages[0].title);
	
	var $container = $('.container'),
		url, filename, params;
	
	
	
	
	for(var i=0;i<har.entries.length;i++) {
		
		$container.append(entrieToHtml(har.entries[i]));
	}
	
	
	
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
		}
		else {
			$this.addClass('opened');
			$this.find('i').removeClass(plusSign).addClass(minusSign);
		}
		return false;
	};
	
	return $.create('div')
				.addClass('row')
				.click(toggle)
				.html('\
				<div class="col-md-4 url">\
					<i class="glyphicon ' + plusSign + '"></i>\
					<a>' + url.join("/") + '</a>\
					<strong>' + filename + '<em>' + params + '</em></strong>\
				</div>\
				<div class="col-md-1 status">' + entrie.response.status + ' ' + entrie.response.statusText + '</div>\
				<div class="col-md-2 type">' + entrie.response.content.mimeType.split(";")[0] + '</div>\
				<div class="col-md-1 size" title="' + size + ' Bytes">' + formatedSize + ' KB</div>\
				<div class="col-md-12 inside"><div class="row">\
					<ul class="nav nav-tabs">\
						<li class="active">\
							<a href="#">Headers</a>\
						</li>\
					</ul>\
					<h4><small>Response Headers</small></h4>\
					' + headers(entrie.response.headers) + '\
					<h4><small>Request Headers</small></h4>\
					' + headers(entrie.request.headers) + '\
				</div></div>\
				');
}