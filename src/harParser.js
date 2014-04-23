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
		
			urlComplete = entry.request.url,
			url = urlComplete.match(/([^:]+:\/+)([^\/]*)(\/?(?:\/?([^\/\?\#]*))*)(.*)/i),
			urlFile, urlParams,
			
			status = entry.response.status,
			statusText = entry.response.statusText || '',
			fullStatus = status + ' ' + statusText,
			
			mimeType = entry.response.content.mimeType && entry.response.content.mimeType.split(';'),
			mime = '', fullMimeType = '',
			
			completeSize = entry.response.content.size,
			compressedSize = entry.response.bodySize,
			sizeToShow = compressedSize,
		
			_tabs = ['headers', 'cookies', 'queryString'], tabs = '', content = '',
			_request = {}, _response = {}, contentText = entry.response.content.text,
			
			progress = {
				startedDateTime:(new Date(entry.startedDateTime)).getTime(),
				time: entry.time,
				blocked: entry.timings.blocked,
				dns: entry.timings.dns,
				connect: entry.timings.connect,
				send: entry.timings.send,
				wait: entry.timings.wait,
				receive: entry.timings.receive,
				ssl: entry.timings.ssl
			},
			totalTime = progress.blocked +
						progress.dns +
						progress.connect +
						progress.send +
						progress.wait +
						progress.receive;
		
		
		
		
		// METHOD
		if(method != 'GET')
			method = strong(method);
		else
			method = '';
		
		
		// URL
		if(!url) {
			if(!urlComplete.indexOf('data:')) {
				urlFile = '<strong>Data:</strong>';
				urlComplete = urlComplete.split(';')[0];
			}
			else {
				urlFile = urlComplete;
			}
		}
		else {
			if(url[4] === '' || !url[4]) {
				if(i > 1)
					urlFile = url[1] + url[2] + url[3];
				else
					urlFile = url[3];
			}
			else
				urlFile = url[4];
		}
		
		
		// STATUS
		if(status >= 500)
			status = strong(status, 'text-danger');
		else if(status >= 400)
			status = strong(status, 'text-warning');
		else if(status < 100)
			status = em(status, 'text-muted');
		
		
		
		// SIZE
		if(compressedSize < 0)
			sizeToShow = 0;
		else if(compressedSize === 0)
			sizeToShow = completeSize;
			

		if(status == 304)
			sizeToShow = em(sizeFormatter(sizeToShow));
		else if(status == 200 && (compressedSize === 0 || compressedSize < 0))
			sizeToShow = strong(sizeFormatter(sizeToShow));
		else
			sizeToShow = sizeFormatter(sizeToShow);
		
		
		//MIME TYPE
		if(!mimeType && urlFile === '<strong>Data:</strong>') {
			mimeType = entry.request.url.match(/^data:(\w+\/\w+);(?:base64,)?(charset=[^,]+,)?(.+)$/i);
			if(mimeType && mimeType[1]) {
				mime = mimeType[1].split('/')[1];
				fullMimeType = mimeType[1];
				if(mimeType[2])
					fullMimeType += '; ' + mimeType[2].substr(0,mimeType[2].length-1);
			}
		}
		else if(mimeType && mimeType.length) {
			mime = mimeType[0].split('/')[1];
			fullMimeType = mimeType[0];
			if(mimeType.length > 1)
				fullMimeType += '; ' + mimeType[1];
		}
		
		
		
		// TABS INFO
		for(var j=0, jlen=_tabs.length, _tab, _tabCapital;j<jlen;j++) {
			
			_tab = _tabs[j];
			_request[_tab] = objListToHtml(entry.request[_tab], _tab=='headers'?['cookie']:undefined);
			_response[_tab] = objListToHtml(entry.response[_tab], _tab=='headers'?['cookie']:undefined);
			
			if(_request[_tab] || _response[_tab]) {
				_tabCapital = _tab.charAt(0).toUpperCase() + _tab.substr(1);
				tabs += '<li><a href="#' + _tab + '">[' + _tabCapital + ']</a></li>';
				content += '<div class="' + _tab + '">';
				
				if(_request[_tab])
					content += '<h3><small>[Request ' + _tabCapital + ']</small></h3>' + _request[_tab];
				
				if(_response[_tab])
					content += '<h3><small>[Response ' + _tabCapital + ']</small></h3>' + _response[_tab];
				
				content += '</div>';	
			}
		}
		
		// CONTENT
		if(contentText) {
			tabs += '<li><a href="#content">[Content]</a></li>';
			content += '<div class="content">';
			if(mimeType && mimeType[0].split('/')[0] == 'image') {
				content += '<img src="data:' + mimeType[0] + ';base64,' + contentText + '" />';
			}
			else {
				content += '<pre class="pre-scrollable">' + htmlEncode(contentText) + '</pre>';
			}
			content += '</div>';
		}
		else if(!contentText && urlFile === '<strong>Data:</strong>') {
			tabs += '<li><a href="#content">[Content]</a></li>';
			content += '<div class="content">';
				content += '<pre class="pre-scrollable">' + htmlEncode(entry.request.url) + '</pre>';
			content += '</div>';
			}
		
		
		
		
		return {
			sign: sign,
			toggleSign: toggleSign,
			method: method,
			fullUrl: urlComplete,
			fileName: urlFile,
			params: url && url[5] || '',
			status: status,
			fullStatus: fullStatus,
			mime: mime,
			fullMimeType: fullMimeType,
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
			_totalTime:totalTime >= 0? totalTime : 0,
			totalTime:formatSize(totalTime >= 0? totalTime : 0, 2) + 'ms',
			rId:Math.floor((Math.random()*(new Date()).getTime())+1)
		};
		
	},
	pct = function(value, pct) {
		if(!value)
			return 0;
		return ((value / pct) * 100) + '%';
	},
	sizeFormatter = function(value, precision) {
		var ext = [' Bytes', ' KB', ' MB', ' GB'],
			i = 0;
		
		while(value > 1024) {
			value /= 1024;
			i++;
		}
		
		return formatSize(value, precision || 2) + ext[i];
	},
	convertProgress = function(entries) {
		
		var startedDateTimeBefore = entries[0].progress.startedDateTime,
			progressContent, startedDateTime, startPosition, startedTime,
			blocked, dns, connect, send, wait, receive;
		
		// debugger;
		
		for(var i=0, ilen=entries.length, entry;i<ilen;i++) {
			
			entry = entries[i];
			
			startedDateTime = entry.progress.startedDateTime;
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
				progressContent += '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> ~' + formatSize(blocked,3) + ' ms</em></p>';
			if(dns >= 0)
				progressContent += '<p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> ~' + formatSize(dns,3) + ' ms</em></p>';
			if(connect >= 0)
				progressContent += '<p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> ~' + formatSize(connect,3) + ' ms</em></p>';
			if(send >= 0)
				progressContent += '<p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> ~' + formatSize(send,3) + ' ms</em></p>';
			if(wait >= 0)
				progressContent += '<p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> ~' + formatSize(wait,3) + ' ms</em></p>';
			if(receive >= 0)
				progressContent += '<p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> ~' + formatSize(receive,3) + ' ms</em></p>';
			
			
			if(progressContent !== '' && startedTime >= 0)
				entries[i].progressStart = '<strong>[Start Time]:</strong> <em>' + startedTime + ' ms</em>';
			else
				entries[i].progressStart = '';
			
			entries[i].progressContent = progressContent;
			
			
			entries[i].startPosition = pct(startedTime, lastTime);
			entries[i].blockedWidth = pct(blocked, lastTime);
			entries[i].dnsWidth = pct(dns, lastTime);
			entries[i].connectWidth = pct(connect, lastTime);
			entries[i].sendWidth = pct(send, lastTime);
			entries[i].waitWidth = pct(wait, lastTime);
			entries[i].receiveWidth = pct(receive, lastTime);
			
			
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
		sign = 'glyphicon-chevron-down',
		toggleSign = 'glyphicon-chevron-up',
		onContentLoad = page.pageTimings.onContentLoad || false,
		onLoad = page.pageTimings.onLoad,
		lastTime = onLoad,
		onContentLoadText = '',
		onLoadText,
		totalSize = 0,
		totalCompressedSize = 0,
		lastTimeArray = [onLoad],
		_i, i, ilen;
	
	
	
	
	
	
	
	

	
	if(id && id !== '') {
		for(i=0, ilen=harEntries.length;i<ilen;i++) {
			if(harEntries[i].pageref && harEntries[i].pageref == page.id) {
				_i = entries.length;
				entries.push(convertHar(harEntries[i], i));
				totalSize += entries[_i].completeSize;
				totalCompressedSize += entries[_i].completeCompressedSize;
				lastTimeArray.push((entries[_i]._totalTime + entries[_i].progress.startedDateTime) - entries[0].progress.startedDateTime);
			}
		}
	}
	else {
		for(i=0, ilen=harEntries.length;i<ilen;i++) {
			_i = entries.length;
			entries.push(convertHar(harEntries[i], i));
			totalSize += entries[_i].completeSize;
			totalCompressedSize += entries[_i].completeCompressedSize;
			lastTimeArray.push((entries[_i]._totalTime + entries[_i].progress.startedDateTime) - entries[0].progress.startedDateTime);
		}
	}
	
	lastTime = Math.max.apply(null, lastTimeArray);
	
	if(onContentLoad)
		onContentLoadText = (onContentLoad / lastTime) * 100;
	
	for(i=0, ilen=entries.length;i<ilen;i++) {
		entries[i].windowloaded = '<span class="windowloaded" data-toggle="tooltip" title="[Page Loaded] (' + formatSize(onLoad, 2) + ' ms)" style="left:' + (onLoad / lastTime * 100) + '%"></span>';
		if(onContentLoad)
			entries[i].domloaded = '<span class="domloaded" data-toggle="tooltip" title="[DOMContentLoaded] (' + formatSize(onContentLoad, 2) + ' ms)" style="left:' + onContentLoadText + '%"></span>';
	}
	
	
	
	
	entries = convertProgress(entries);
	
	entries.title = page.title;
	
	entries.info = '<th>' + entries.length + ' [requests]</th>' + 
						'<th colspan="3" class="text-right">' + sizeFormatter(totalSize>=0?totalSize:0) + 
						' (' + sizeFormatter(totalCompressedSize>=0?totalCompressedSize:0) + ' [compressed])</th>' + 
						'<th class="text-center">' + (onContentLoad >= 0?'(' + formatSize(onContentLoad / 1000, 2) + 's) ':'') + formatSize(onLoad / 1000, 2) + 's</th>';
	
	return entries;
	
	
};