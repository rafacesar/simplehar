module.exports = function(har, htmlEncode) {
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
		domTime = har.log.pages[0].pageTimings.onContentLoad,
		fullSize, sizeToShow, entrie, url, filename, size, responseHeaders, progressStart,
		responseCookies, requestCookies, progressContent, startedTime, domloaded,
		requestHeaders, charset, tabs, content, responseContent, mimeType, windowloaded,
		_responseContent, progress, startTimeBefore, startTime, startPosition,
		blockedWidth, dnsWidth, connectWidth, sendWidth, waitWidth, receiveWidth,
		requests = ilen, totalSize = 0, totalTime = onLoad, totalSizeCache = 0;

		
		// newHar.info = {requests:ilen, totalSize:0, totalTime:onLoad, totalSizeCache:0};
		
		if(typeof domTime !== 'undefined') {
			domloaded = (domTime / onLoad) * 100;
			domloaded = '<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (' + formatSize(domTime, 2) + ' ms)" style="left:' + domloaded + '%"></span>';
		}
		else
			domloaded = '';
		windowloaded = '<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (' + formatSize(onLoad, 2) + ' ms)" style="left:100%"></span>';

// debugger;

		for(;i<ilen;i++) {
			entrie = entries[i];
			
			url = entrie.request.url.split('/');
			filename = url[url.length - 1].split('#')[0].split('?')[0];
			
			responseHeaders = objListToHtml(entrie.response.headers, ['cookie']);
			requestHeaders = objListToHtml(entrie.request.headers, ['cookie']);
			responseCookies = objListToHtml(entrie.response.cookies);
			requestCookies = objListToHtml(entrie.request.cookies);
			responseContent = entrie.response.content.text;
			
			
			totalSize += entrie.response.content.size;
			totalSizeCache += entrie.response.bodySize;
			
			
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
			else if(entrie.response.status == 200 && size === 0)
				sizeToShow = '<strong>' + formatSize(parseInt(sizeToShow,10) / 1024) + ' KB</strong>';
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
					content += '<pre class="pre-scrollable">' + htmlEncode(responseContent) + '</pre>';
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
			
			progressStart = '<p class=\'clearfix start-time\'><strong>Start Time:</strong> <em>' + startedTime + ' ms</em></p>';
			
			progressContent = '';
			if(entrie.timings.blocked >= 0)
				progressContent += '<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> ~' + formatSize(entrie.timings.blocked,5) + ' ms</em></p>';
			if(entrie.timings.dns >= 0)
				progressContent += '<p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> ~' + formatSize(entrie.timings.dns,5) + ' ms</em></p>';
			if(entrie.timings.connect >= 0)
				progressContent += '<p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> ~' + formatSize(entrie.timings.connect,5) + ' ms</em></p>';
			if(entrie.timings.send >= 0)
				progressContent += '<p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~' + formatSize(entrie.timings.send,5) + ' ms</em></p>';
			if(entrie.timings.wait >= 0)
				progressContent += '<p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~' + formatSize(entrie.timings.wait,5) + ' ms</em></p>';
			if(entrie.timings.receive >= 0)
				progressContent += '<p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~' + formatSize(entrie.timings.receive,5) + ' ms</em></p>';
			
			newHar.entries.push({
				sign:sign,
				toggleSign:toggleSign,
				method: (entrie.request.method=='GET')?(entrie.request.method):('<strong>' + entrie.request.method + '</strong>'),
				fullUrl: url.join('/'),
				//TODO: check when the domain is different
				fileName: filename || '/',
				params:url[url.length - 1].substr(filename.length),
				statusToShow:(entrie.response.status>=500)?('<strong>' + entrie.response.status + ' ' + entrie.response.statusText + '</strong>'):((entrie.response.status>=400)?('<em>' + entrie.response.status + ' ' + entrie.response.statusText + '</em>'):(entrie.response.status + ' ' + entrie.response.statusText)),
				responseStatus:entrie.response.status,
				responseTextStatus:entrie.response.statusText,
				mimeType:mimeType,
				charset:(mimeType && entrie.response.content.mimeType.split(";")[1]) || '',
				size:formatSize(size,'0') + ' Bytes',
				fullSize:formatSize(fullSize,'0') + ' Bytes',
				sizeToShow:sizeToShow,
				formatedFullSize:formatSize(parseInt(fullSize,10) / 1024) + ' KB',
				tabs:tabs,
				tabContainers:content,
				progress:progress,
				progressStart:progressStart,
				progressContent:progressContent,
				domloaded:domloaded,
				windowloaded:windowloaded
			});
		}
		
		
		newHar.info = '<th>' + requests + ' requests</th>' + 
						'<th colspan="3" class="text-right">~' + formatSize(totalSize / 1024, 2) + ' KB ' + 
						'(~' + formatSize(totalSizeCache / 1024, 2) + ' KB compressed)</th>' + 
						'<th class="text-center">' + (domTime?'(' + formatSize(domTime / 1000, 2) + 's) ':'') + formatSize(totalTime / 1000, 2) + 's</th>';
		
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
	formatSize = function(number, precision) {
		var matcher, fPoint;
		precision = precision || 2;
		number = number.toFixed(precision);
		if(precision === '0')
			return number;
		fPoint = number.split('.')[1];
		matcher = fPoint.match(/0+/);
		if(matcher && matcher[0].length == fPoint.length) {
			return number.split('.')[0];
		}
		else {
			return number.replace('.', ',');
		}
	};
	
	return prepareHar(har);
	
};