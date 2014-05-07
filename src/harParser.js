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
	
	pct = function(value, pct, symbol) {
		if(!value)
			return 0;
		symbol = symbol || '%';
		return ((value / pct) * 100) + symbol;
	},
	objToDl = function(arr, filters) {
		if(arr && arr.length) {
			var dl = '<dl class="dl-horizontal">';
			for(var i=0,ilen=arr.length;i<ilen;i++) {
				if(!filters || !filters.length || lowerReverseIndexOf(arr[i].name, filters) == -1)
					dl += '<dt>' + arr[i].name + '</dt><dd>' + arr[i].value.split(';').join(';<br>') + '</dd>';
			}
			dl += '</dl>';
			return dl;
		}
		return '';
	},
	lowerReverseIndexOf = function(pattern, arr) {
		for(var i=0, ilen=arr.length;i<ilen;i++) {
			if(pattern.toLowerCase().indexOf(arr[i].toLowerCase()) != -1)
				return i;
		}
		return -1;
	},
	dataSizeFormatter = function(value, precision) {
		var ext = [' Bytes', ' KB', ' MB', ' GB'],
			i = 0;
		
		value = value >= 0 ? value : 0;
		
		while(value > 1024) {
			value /= 1024;
			i++;
		}
		
		return precisionFormatter(value, precision || 2) + ext[i];
	},
	
	timeFormatter = function(time, precision) {
		var ext = ['ms', 's', 'min'],
			div = [1000, 60, 60],
			i = 0;
		
		time = time >= 0 ? time : 0;
		
		while(time > div[i]) {
			time /= div[i];
			i++;
		}
		
		return precisionFormatter(time, precision || 2) + ext[i];
	},
	precisionFormatter = function(number, precision) {
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
			//Need to think on how to make this 'translatable'
			//Not everyone use dot (.) as separator
			return number;//.replace('.', ',');
		}
	},
	urlRe = /([^:]+:\/+)([^\/]*)(\/?(?:\/?([^\/\?\#]*))*)(.*)/i,
	urlDataRe = /^data:(\w+\/\w+);(?:base64,)?(charset=[^,]+,)?(.+)$/i,
	
	parseUrl = function(url, complete) {
		
		var urlMatch = url.match(urlRe),
			urlFile;
		
		if(!urlMatch) {
			if(!url.indexOf('data:')) {
				urlFile = strong('Data:');
				// url = url.split(';')[0];
			}
			else {
				urlFile = url;
			}
		}
		else {
			if(!urlMatch[4]) {
				urlFile = urlMatch[3];
				
				if(complete)
					urlFile = urlMatch[1] + urlMatch[2] + urlFile;
			}
			else
				urlFile = urlMatch[4];
		}
		
		urlFile = urlFile.replace(/^\s*/g,'').replace(/\s*$/g,'');
		
		if(!url.indexOf('https'))
			urlFile = '<strong class="text-success">' + urlFile + '</strong>';
		
		return {
			params: urlMatch && urlMatch[5] || '',
			file: urlFile,
			//Should i use: decodeURIComponent here ??
			complete:url
		};
	},
	
	parseMethod = function(method) {
		if(method.toLowerCase() === 'get')
			return '';
		
		return method && strong(method) || '';
	},
	
	parseStatus = function(code, statusText) {
		
		var status = code;
		
		statusText = statusText || '';
		
		if(code >= 500)
			status = strong(code, 'text-danger');
		else if(code >= 400)
			status = strong(code, 'text-warning');
		else if(code < 100)
			status = em(code, 'text-muted');
		
		
		return {
			code: code,
			status: status,
			complete: code + ' ' + statusText
		};
		
	},
	
	parseSize = function(size, compressed, status) {
		
		var mainSize = compressed;
		
		if(compressed < 0)
			mainSize = 0;
		else if(compressed === 0)
			mainSize = size;
		
		mainSize = dataSizeFormatter(mainSize);

		if(status == 304)
			mainSize = em(mainSize);
		else if(status == 200 && (!compressed || compressed < 0))
			mainSize = strong(mainSize);
		
		
		return {
			originalSize: size + ' Bytes',
			originalCompressed: compressed + ' Bytes',
			size: mainSize,
			complete: size,
			compressed: compressed
		};
	},
	
	parseMime = function(mimeType, url) {
		
		var inline = false,
			mime;
		
		if(!mimeType && !url.indexOf('data:')) {
			mimeType = url.match(urlDataRe);
			
			if(mimeType && mimeType[1])
				mimeType = mimeType[1] + '; ' + (mimeType[2] && mimeType[2].substr(0,mimeType[2].length-1) || '');
			else
				mimeType = false;
			
			inline = true;
		}
		
		
		if(mimeType) {
			mime = mimeType.split(';')[0].split('/');
			
			return {
				complete: mimeType,
				type: mime[1],
				base: mime[0],
				inline: inline
			};
		}
		else {
			return {
				complete: '',
				type: '',
				base: '',
				inline: inline
			};
		}
	},
	parseContent = function(content, url, mime) {
		var tabs = '',
			result = '';
		
		if(content || !url.indexOf('data:')) {
			tabs += '<li><a href="#content">[Content]</a></li>';
			result += '<div class="content">';
			
			
			if(mime.base == 'image') {
				if(content)
					result += '<img src="data:' + mime.base + '/' + mime.type + ';base64,' + content + '" />';
				else
					result += '<img src="' + url + '" />';
			}
			else {
				if(content)
					result += '<pre class="pre-scrollable">' + htmlEncode(content) + '</pre>';
				else
					result += '<pre class="pre-scrollable">' + htmlEncode(url) + '</pre>';
			}
			
			result += '</div>';
			
		}
		return {
			tabs: tabs,
			result: result
		};
	},
	
	parseProgress = function(entry) {
		var timings = entry.timings;
		
		return {
			startedDateTime:(new Date(entry.startedDateTime)).getTime(),
			time: entry.time,
			blocked: timings.blocked,
			dns: timings.dns,
			connect: timings.connect,
			send: timings.send,
			wait: timings.wait,
			receive: timings.receive,
			ssl: timings.ssl,
			total:	timings.blocked +
					timings.dns +
					timings.connect +
					timings.send +
					timings.wait +
					timings.receive
		};
	},
	
	convertHar = function(entry, i) {
		
		
		var __request = entry.request,
			__response = entry.response,
			
			method = parseMethod(__request.method),
			url = parseUrl(__request.url, i > 1),
			status = parseStatus(__response.status, __response.statusText),
			size = parseSize(__response.content.size, __response.bodySize, status.code),
			mime = parseMime(__response.content.mimeType || '', url.complete),
			contextTextContent = parseContent(entry.response.content.text, url.complete, mime),
		
			
			
			
			
			_tabs = ['headers', 'cookies', 'queryString'],
			tabs = '', content = '', _request = {}, _response = {},
			
			progress = parseProgress(entry),
			
			totalTime = progress.total;
		
		
		
		
		
		
		
		// TABS INFO
		for(var j=0, jlen=_tabs.length, _tab, _tabCapital;j<jlen;j++) {
			
			_tab = _tabs[j];
			_request[_tab] = objToDl(entry.request[_tab], _tab=='headers'?['cookie']:undefined);
			_response[_tab] = objToDl(entry.response[_tab], _tab=='headers'?['cookie']:undefined);
			
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
		
		tabs += contextTextContent.tabs;
		content += contextTextContent.result;
		
		
		
		
		return {
			sign: sign,
			toggleSign: toggleSign,
			method: method,
			fullUrl: url.complete,
			fileName: url.file,
			params: url.params,
			status: status.status,
			fullStatus: status.complete,
			mime: mime.type,
			fullMimeType: mime.complete,
			mimeType: mime.base + '/' + mime.type,
			size: size.originalCompressed,
			fullSize: size.originalSize,
			sizeToShow: size.size,
			tabs: tabs,
			tabContainers: content,
			progress:progress,
			domloaded:onContentLoadText,
			windowloaded:onLoadText,
			totalTime:timeFormatter(totalTime),
			rId:Math.floor((Math.random()*(new Date()).getTime())+1),
			order: i+1,
			bgstatus: (status.code >= 500?'danger':(status.code >= 400?'warning':(status.code >= 300?'redirect':'')))
		};
		
	},
	
	convertProgress = function(entries) {
		
		var startedDateTimeBefore = entries[0].progress.startedDateTime,
			progressContent, startedDateTime, startPosition, startedTime,
			blocked, dns, connect, send, wait, receive;
		
		
		for(var i=0, ilen=entries.length, entry;i<ilen;i++) {
			
			entry = entries[i];
			
			startedDateTime = entry.progress.startedDateTime;
			startedTime = startedDateTime - startedDateTimeBefore;
			
			
			blocked = entry.progress.blocked;
			dns = entry.progress.dns;
			connect = entry.progress.connect;
			send = entry.progress.send;
			wait = entry.progress.wait;
			receive = entry.progress.receive;
			
			
			progressContent = '';
			
			if(blocked >= 0)
				progressContent += '<p class=\'clearfix bg-warning\'><strong>[Blocking]: </strong> <em> ' + timeFormatter(blocked, 3) + '</em></p>';
			if(dns >= 0)
				progressContent += '<p class=\'clearfix bg-last\'><strong>[DNS]: </strong> <em> ~' + timeFormatter(dns, 3) + '</em></p>';
			if(connect >= 0)
				progressContent += '<p class=\'clearfix bg-info\'><strong>[Connect]: </strong> <em> ~' + timeFormatter(connect, 3) + '</em></p>';
			if(send >= 0)
				progressContent += '<p class=\'clearfix bg-primary\'><strong>[Send]: </strong> <em> ~' + timeFormatter(send, 3) + '</em></p>';
			if(wait >= 0)
				progressContent += '<p class=\'clearfix bg-danger\'><strong>[Wait]: </strong> <em> ~' + timeFormatter(wait, 3) + '</em></p>';
			if(receive >= 0)
				progressContent += '<p class=\'clearfix bg-success\'><strong>[Receive]: </strong> <em> ~' + timeFormatter(receive, 3) + '</em></p>';
			
			
			if(progressContent !== '' && startedTime >= 0)
				entries[i].progressStart = '<strong>[Start Time]:</strong> <em>' + timeFormatter(startedTime, 3) + '</em>';
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
		ilen = harEntries.length,
		i, hEntry;
	
	
	
	
	if(id && id !== '') {
		for(i=0;i<ilen;i++) {
			hEntry = harEntries[i];
			if(hEntry.pageref && hEntry.pageref == id)
				entries.push(hEntry);
		}
	}
	else {
		for(i=0;i<ilen;i++)
			entries.push(harEntries[i]);
	}
	
	
	entries.sort(function(a, b) {
		a = a.startedDateTime;
		b = b.startedDateTime;
		
		if(a)
			a = (new Date(a)).getTime();
		else
			a = 0;
		
		if(b)
			b = (new Date(b)).getTime();
		else
			b = 0;
		
		
		return a - b;
		
	});
	
	for(i=0,ilen=entries.length;i<ilen;i++) {
		hEntry = entries[i];
		
		totalSize += hEntry.response.content.size;
		totalCompressedSize += hEntry.response.bodySize;
		
		hEntry = entries[i] = convertHar(entries[i], i);

		lastTimeArray.push((hEntry.progress.total + hEntry.progress.startedDateTime) - entries[0].progress.startedDateTime);
	}

	
	lastTime = Math.max.apply(null, lastTimeArray);
	
	if(onContentLoad)
		onContentLoadText = pct(onContentLoad, lastTime);
	
	for(i=0;i<ilen;i++) {
		entries[i].windowloaded = '<span class="windowloaded" data-toggle="tooltip" title="[Page Loaded] (' + timeFormatter(onLoad) + ')" style="left:' + pct(onLoad,lastTime) + '"></span>';
		if(onContentLoad)
			entries[i].domloaded = '<span class="domloaded" data-toggle="tooltip" title="[DOMContentLoaded] (' + timeFormatter(onContentLoad) + ')" style="left:' + onContentLoadText + '"></span>';
	}
	
	
	
	
	entries = convertProgress(entries);
	
	entries.title = page.title;
	
	entries.info = '<th>' + entries.length + ' [requests]</th>' + 
						'<th colspan="3" class="text-right">' + dataSizeFormatter(totalSize) + 
						' (' + dataSizeFormatter(totalCompressedSize) + ' [compressed])</th>' + 
						'<th class="text-center">' + (onContentLoad !== false?'(' + timeFormatter(onContentLoad) + ') ':'') + timeFormatter(onLoad) + '</th>';
	
	return entries;
	
	
};