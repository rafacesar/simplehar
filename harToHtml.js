module.exports = function(har, htmler) {
	'use strict';
	var prepareHar = function(har) {
		var newHar = {
			entries:[]
		},
		entries = har.log.entries,
		i = 0, ilen = entries.length,
		sign = 'glyphicon-arrow-right',
		toggleSign = 'glyphicon-arrow-down',
		//TODO: check this later to get from the page ID
		onLoad = har.log.pages[0].pageTimings.onLoad,
		fullSize, sizeToShow, entrie, url, filename, size, responseHeaders,
		responseCookies, requestCookies, progressContent, startedTime,
		requestHeaders, charset, tabs, content, responseContent, mimeType, 
		_responseContent, progress, startTimeBefore, startTime, startPosition,
		blockedWidth, dnsWidth, connectWidth, sendWidth, waitWidth, receiveWidth;


		newHar.domLoadedPosition = (har.log.pages[0].pageTimings.onContentLoad / onLoad) * 100;





		for(;i<ilen;i++) {
			entrie = entries[i];
			
			url = entrie.request.url.split('/');
			filename = url[url.length - 1].split('#')[0].split('?')[0];
			
			responseHeaders = objListToHtml(entrie.response.headers, ['cookie']);
			requestHeaders = objListToHtml(entrie.request.headers, ['cookie']);
			responseCookies = objListToHtml(entrie.response.cookies);
			requestCookies = objListToHtml(entrie.request.cookies);
			responseContent = entrie.response.content.text;
			
			fullSize = entrie.response.content.size;
			size = entrie.response.bodySize;
			if(size < 0)
				sizeToShow = 0;
			else if(size === 0)
				sizeToShow = fullSize;
			else
				sizeToShow = size;
			
			if(entrie.response.status == 304)
				sizeToShow = '<em>' + formatSize(parseInt(sizeToShow,10) / 1024) + ' KB</em>';
			else
				sizeToShow = formatSize(parseInt(sizeToShow,10) / 1024) + ' KB';
			
			mimeType = entrie.response.content.mimeType && entrie.response.content.mimeType.split(";")[0];
			tabs = '';
			content = '';
			
			if(responseHeaders || requestHeaders) {
				tabs += '<li><a href="#headers">Headers</a></li>';
				content += '<div class="headers"><h3><small>Request Headers</small></h3>' + requestHeaders + '<h3><small>Response Headers</small></h3>' + responseHeaders + '</div>';
			}
			
			if(requestCookies || responseCookies) {
				tabs += '<li><a href="#cookies">Cookies</a></li>';
				content += '<div class="cookies"><h3><small>Request Cookies</small></h3>' + requestCookies + '<h3><small>Response Cookies</small></h3>' + responseCookies + '</div>';
			}
			
			if(responseContent) {
				tabs += '<li><a href="#content">Content</a></li>';
				content += '<div class="content">';
				if(mimeType && mimeType.split('/')[0] == 'image') {
					content += '<img src="data:' + mimeType + ';base64,' + responseContent + '" />';
				}
				else {
					content += '<pre class="pre-scrollable">' + htmler(responseContent) + '</pre>';
				}
				content += '</div>';
			}
			
			progress = '<div class="progress">';
			
			if(!startTimeBefore) {
				startTimeBefore = (new Date(entrie.startedDateTime)).getTime();
				startedTime = startPosition = 0;
			}
			else {
				startTime = (new Date(entrie.startedDateTime)).getTime();
				startedTime = startTime - startTimeBefore;
				startPosition = (startedTime / onLoad) * 100;
			}
			
			blockedWidth = (entrie.timings.blocked / onLoad) * 100;
			dnsWidth = (entrie.timings.dns / onLoad) * 100;
			connectWidth = (entrie.timings.connect / onLoad) * 100;
			sendWidth = (entrie.timings.send / onLoad) * 100;
			waitWidth = (entrie.timings.wait / onLoad) * 100;
			receiveWidth = (entrie.timings.receive / onLoad) * 100;
			
			progress += '<div class="progress-bar progress-bar-space" style="width: ' + startPosition + '%"></div>' + 
						'<div class="progress-bar progress-bar-warning" style="width: ' + blockedWidth + '%"></div>' + 
						'<div class="progress-bar progress-bar-last" style="width: ' + dnsWidth + '%"></div>' + 
						'<div class="progress-bar progress-bar-info" style="width: ' + connectWidth + '%"></div>' + 
						'<div class="progress-bar progress-bar-primary" style="width: ' + sendWidth + '%"></div>' + 
						'<div class="progress-bar progress-bar-danger" style="width: ' + waitWidth + '%"></div>' + 
						'<div class="progress-bar progress-bar-success" style="width: ' + receiveWidth + '%"></div></div>';
			
			progressContent = '<p class=\'clearfix start-time\'><strong>Start Time:</strong> <em>' + startedTime + ' ms</em></p>';
			
			if(entrie.timings.blocked >= 0)
				progressContent += '<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> ' + formatSize(entrie.timings.blocked,5) + ' ms</em></p>';
			if(entrie.timings.dns >= 0)
				progressContent += '<p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> ' + formatSize(entrie.timings.dns,5) + ' ms</em></p>';
			if(entrie.timings.connect >= 0)
				progressContent += '<p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> ' + formatSize(entrie.timings.connect,5) + ' ms</em></p>';
			if(entrie.timings.send >= 0)
				progressContent += '<p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ' + formatSize(entrie.timings.send,5) + ' ms</em></p>';
			if(entrie.timings.wait >= 0)
				progressContent += '<p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ' + formatSize(entrie.timings.wait,5) + ' ms</em></p>';
			if(entrie.timings.receive >= 0)
				progressContent += '<p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ' + formatSize(entrie.timings.receive,5) + ' ms</em></p>';
			
			newHar.entries.push({
				sign:sign,
				toggleSign:toggleSign,
				method: (entrie.request.method=='GET')?(entrie.request.method):('<strong>' + entrie.request.method + '</strong>'),
				fullUrl: url.join('/'),
				//TODO: check when the domain is different
				fileName: filename || '/',
				params:url[url.length - 1].substr(filename.length),
				statusToShow:(entrie.response.status>=500)?('<strong>' + entrie.response.status + ' ' + entrie.response.statusText + '</strong>'):(entrie.response.status + ' ' + entrie.response.statusText),
				responseStatus:entrie.response.status,
				responseTextStatus:entrie.response.statusText,
				mimeType:mimeType,
				charset:(mimeType && entrie.response.content.mimeType.split(";")[1]) || '',
				size:formatSize(size,0) + ' Bytes',
				fullSize:formatSize(fullSize,0) + ' Bytes',
				sizeToShow:sizeToShow,
				formatedFullSize:formatSize(parseInt(fullSize,10) / 1024) + ' KB',
				tabs:tabs,
				tabContainers:content,
				progress:progress,
				progressContent:progressContent
			});
		}
		
		return newHar;
		
	},
	objListToHtml = function(arr, filters) {
		if(arr.length) {
			var dl = '<dl class="dl-horizontal">';
			for(var i=0,ilen=arr.length;i<ilen;i++) {
				if(!filters || !filters.length || filters.indexOf(arr[i].name) == -1)
					dl += '<dt>' + arr[i].name + '</dt><dd>' + arr[i].value.split(';').join(';<br>') + '</dd>';
			}
			dl += '</dl>';
			return dl;
		}
		return '';
	},
	formatSize = function(n, c, d, t){
		c = isNaN(c = Math.abs(c)) ? 2 : c; d = d === undefined ? "," : d; t = t === undefined ? "." : t;var s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
		(c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
	
	return prepareHar(har);
	
};