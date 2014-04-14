module.exports = function(har, htmlEncode) {
	'use strict';
	
	har = har.log;
	
	
	var strong = function(str,cname) {
		if(cname)
			cname = ' class="' + cname + '"';
		else
			cname = '';
		return '<strong' + cname + '>' + str + '</strong>';
	},
	
	em = function(str, cname) {
		if(cname)
			cname = ' class="' + cname + '"';
		else
			cname = '';
		return '<em' + cname + '>' + str + '</em>';
	},
	
	
	convertHar = function(entry, i) {
		
		
		var method = entry.request.method,
		
			url = entry.request.url.match(/([^:]+:\/+)([^\/]*)(\/?(?:\/?([^\/\?\#]*))*)(.*)/i),
			
			status = entry.response.status,
			statusText = entry.response.statusText || '',
			
			mimeType = entry.response.content.mimeType && entry.response.content.mimeType.split(';'),
			
			completeSize = entry.response.content.size,
			compressedSize = entry.response.bodySize,
			sizeToShow = compressedSize,
		
			_tabs = ['headers', 'cookies'], tabs = '', content = '',
			_request = {}, _response = {}, contentText = entry.response.content.text,
			
			progress = {
				startedDateTime:entry.startedDateTime,
				time: entry.time,
				blocked: entry.timings.blocked,
				dns: entry.timings.dns,
				connect: entry.timings.connect,
				send: entry.timings.send,
				wait: entry.timings.wait,
				receive: entry.timings.receive,
				ssl: entry.timings.ssl
			};
		
		
		
		
		// METHOD
		if(method != 'GET')
			method = strong(method);
		
		
		// URL
		if(url[4] === '' || !url[4]) {
			if(i > 1)
				url[4] = url.splice(1,3).join('');
			else
				url[4] = url[3];
		}
		
		
		// STATUS
		if(status >= 500)
			statusText = strong(status + ' ' + statusText, 'text-danger');
		else if(status >= 400)
			statusText = strong(status + ' ' + statusText, 'text-warning');
		else if(status < 100)
			statusText = em(status + ' ' + statusText, 'text-muted');
		else
			statusText = status + ' ' + statusText;
		
		
		
		
		// SIZE
		if(compressedSize < 0)
			sizeToShow = 0;
		else if(compressedSize === 0)
			sizeToShow = completeSize;
			

		if(status == 304)
			sizeToShow = em(formatSize(sizeToShow / 1024) + ' KB');
		else if(status == 200 && (compressedSize === 0 || compressedSize < 0))
			sizeToShow = strong(formatSize(sizeToShow / 1024) + ' KB');
		else
			sizeToShow = formatSize(sizeToShow / 1024) + ' KB';
		
		
		
		
		
		
		
		// TABS INFO
		for(var j=0, jlen=_tabs.length, _tab, _tabCapital;j<jlen;j++) {
			
			_tab = _tabs[j];
			_request[_tab] = objListToHtml(entry.request[_tab], _tab=='headers'?['cookie']:undefined);
			_response[_tab] = objListToHtml(entry.response[_tab], _tab=='headers'?['cookie']:undefined);
			
			if(_request[_tab] || _response[_tab]) {
				_tabCapital = _tab.charAt(0).toUpperCase() + _tab.substr(1);
				tabs += '<li><a href="#' + _tab + '">' + _tabCapital + '</a></li>';
				content += '<div class="' + _tab + '">';
				
				if(_request[_tab])
					content += '<h3><small>Request ' + _tabCapital + '</small></h3>' + _request[_tab];
				
				if(_response[_tab])
					content += '<h3><small>Response ' + _tabCapital + '</small></h3>' + _response[_tab];
				
				content += '</div>';	
			}
		}
		
		// CONTENT
		if(contentText) {
			tabs += '<li><a href="#content">Content</a></li>';
			content += '<div class="content">';
			if(mimeType && mimeType[0].split('/')[0] == 'image') {
				content += '<img src="data:' + mimeType[0] + ';base64,' + contentText + '" />';
			}
			else {
				content += '<pre class="pre-scrollable">' + htmlEncode(contentText) + '</pre>';
			}
			content += '</div>';
		}
		
		
		
		return {
			sign: sign,
			toggleSign: toggleSign,
			method: method,
			fullUrl: url[0],
			fileName: url[4],
			params: url[5] || '',
			statusToShow: statusText,
			mimeType: mimeType && mimeType[0] || '',
			charset: mimeType && mimeType[1] || '',
			size: formatSize(compressedSize,'0') + ' Bytes',
			fullSize: formatSize(completeSize,'0') + ' Bytes',
			sizeToShow: sizeToShow,
			formatedFullSize: formatSize(completeSize / 1024) + ' KB',
			tabs: tabs,
			tabContainers: content,
			progress:progress,
			completeSize:completeSize,
			completeCompressedSize:compressedSize,
			domloaded:onContentLoadText,
			windowloaded:onLoadText,
			rId:Math.floor((Math.random()*(new Date()).getTime())+1)
		};
		
	},
	pct = function(value, pct) {
		if(!value)
			return 0;
		return ((value / pct) * 100) + '%';
	},
	convertProgress = function(entries) {
		
		var startedDateTimeBefore = (new Date(entries[0].progress.startedDateTime)).getTime(),
			progressContent, startedDateTime, startPosition, startedTime,
			blocked, dns, connect, send, wait, receive;
		
		// debugger;
		
		for(var i=0, ilen=entries.length, entry;i<ilen;i++) {
			
			entry = entries[i];
			
			startedDateTime = (new Date(entry.progress.startedDateTime)).getTime();
			startedTime = startedDateTime - startedDateTimeBefore;
			
			// startedDateTimeBefore = startedDateTime;
			
			blocked = entry.progress.blocked;
			dns = entry.progress.dns;
			connect = entry.progress.connect;
			send = entry.progress.send;
			wait = entry.progress.wait;
			receive = entry.progress.receive;
			
			
			progressContent = '';
			
			if(blocked >= 0)
				progressContent += '<p class=\'clearfix bg-warning\'><strong>Blocking: </strong> <em> ~' + formatSize(blocked,5) + ' ms</em></p>';
			if(dns >= 0)
				progressContent += '<p class=\'clearfix bg-last\'><strong>DNS: </strong> <em> ~' + formatSize(dns,5) + ' ms</em></p>';
			if(connect >= 0)
				progressContent += '<p class=\'clearfix bg-info\'><strong>Connect: </strong> <em> ~' + formatSize(connect,5) + ' ms</em></p>';
			if(send >= 0)
				progressContent += '<p class=\'clearfix bg-primary\'><strong>Send: </strong> <em> ~' + formatSize(send,5) + ' ms</em></p>';
			if(wait >= 0)
				progressContent += '<p class=\'clearfix bg-danger\'><strong>Wait: </strong> <em> ~' + formatSize(wait,5) + ' ms</em></p>';
			if(receive >= 0)
				progressContent += '<p class=\'clearfix bg-success\'><strong>Receive: </strong> <em> ~' + formatSize(receive,5) + ' ms</em></p>';
			
			
			entries[i].progressStart = '<strong>Start Time:</strong> <em>' + startedTime + ' ms</em>';
			
			entries[i].progressContent = progressContent;
			
			
			entries[i].startPosition = pct(startedTime, onLoad);
			entries[i].blockedWidth = pct(blocked, onLoad);
			entries[i].dnsWidth = pct(dns, onLoad);
			entries[i].connectWidth = pct(connect, onLoad);
			entries[i].sendWidth = pct(send, onLoad);
			entries[i].waitWidth = pct(wait, onLoad);
			entries[i].receiveWidth = pct(receive, onLoad);
			
			
		}
		
		return entries;
		
	},
	objListToHtml = function(arr, filters) {
		if(arr && arr.length) {
			var dl = '<dl class="dl-horizontal">';
			for(var i=0,ilen=arr.length;i<ilen;i++) {
				if(!filters || !filters.length || _indexOf(arr[i].name, filters) == -1)
					dl += '<dt>' + arr[i].name + '</dt><dd>' + arr[i].value.split(';').join(';<br>') + '</dd>';
			}
			dl += '</dl>';
			return dl;
		}
		return '';
	},
	_indexOf = function(pattern, arr) {
		for(var i=0, ilen=arr.length;i<ilen;i++) {
			if(pattern.toLowerCase().indexOf(arr[i].toLowerCase()) != -1)
				return i;
		}
		return -1;
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
	
	
	
	var page = har.pages[0],
		harEntries = har.entries,
		entries = [],
		id = page.id,
		sign = 'glyphicon-arrow-right',
		toggleSign = 'glyphicon-arrow-down',
		onContentLoad = page.pageTimings.onContentLoad || false,
		onLoad = page.pageTimings.onLoad,
		onContentLoadText = '',
		onLoadText = '<span class="windowloaded" data-toggle="tooltip" title="Page Loaded (' + formatSize(onLoad, 2) + ' ms)" style="left:100%"></span>',
		i, ilen;
	
	
	if(onContentLoad) {
		onContentLoadText = (onContentLoad / onLoad) * 100;
		onContentLoadText = '<span class="domloaded" data-toggle="tooltip" title="DOMContentLoaded (' + formatSize(onContentLoad, 2) + ' ms)" style="left:' + onContentLoadText + '%"></span>';
	}
	
	
	
	
	var totalSize = 0,
		totalCompressedSize = 0;
	
	if(id && id !== '') {
		for(i=0, ilen=harEntries.length;i<ilen;i++) {
			if(harEntries[i].pageref && harEntries[i].pageref == page.id) {
				entries.push(convertHar(harEntries[i], i));
				totalSize += entries[entries.length - 1].completeSize;
				totalCompressedSize += entries[entries.length - 1].completeCompressedSize;
			}
		}
	}
	else {
		for(i=0, ilen=harEntries.length;i<ilen;i++) {
			entries.push(convertHar(harEntries[i], i));
			totalSize += entries[entries.length - 1].completeSize;
			totalCompressedSize += entries[entries.length - 1].completeCompressedSize;
		}
	}
	
	
	entries = convertProgress(entries);
	
	entries.title = page.title;
	
	entries.info = '<th>' + entries.length + ' requests</th>' + 
						'<th colspan="3" class="text-right">~' + formatSize(totalSize / 1024, 2) + ' KB ' + 
						'(~' + formatSize(totalCompressedSize / 1024, 2) + ' KB compressed)</th>' + 
						'<th class="text-center">' + (onContentLoad?'(' + formatSize(onContentLoad / 1000, 2) + 's) ':'') + formatSize(onLoad / 1000, 2) + 's</th>';
	
	return entries;
	
	
};