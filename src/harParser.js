var harParser = module.exports = function(har, htmlEncode) {
	'use strict';
	
	har = har.log;
	
	// if(!htmlEncode)
	// 	console.error('htmlEncode not found. The content tab will not be displayed');
	
	var 
	
	convertHar = function(entry, i) {
		
		
		var __request = entry.request,
			__response = entry.response,
			
			method = harParser.parseMethod(__request.method),
			url = harParser.parseUrl(__request.url, i > 1),
			status = harParser.parseStatus(__response.status, __response.statusText),
			size = harParser.parseSize(__response.content.size, __response.bodySize, status.code),
			mime = harParser.parseMime(__response.content.mimeType || '', url.complete),
			responseContent = harParser.parseContent(
				__response.content.text,
				url.complete,
				mime,
				htmlEncode
			),
			progress = harParser.parseProgress(entry),
			totalTime = progress.total,
			infos = [
				{tab:'headers', decode:false, filter:'cookie'},
				{tab:'cookies', decode:true, filter:false},
				{tab:'queryString', decode:true, filter:false}
			],
			tabs = '',
			containers = '',
			j = 0,
			jlen = infos.length,
			info;
		
		// TABS INFO
		for(;j<jlen;j++) {
			info = infos[j];
			info = harParser.tabContainer(info, __request, __response);
			tabs += info.tabs;
			containers += info.containers;
		}
		tabs += responseContent.tabs;
		containers += responseContent.result;
		
		
		
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
			tabContainers: containers,
			fileContent: responseContent._result,
			progress:progress,
			domloaded:onContentLoadText,
			windowloaded:onLoadText,
			totalTime:harParser.timeFormatter(totalTime),
			rId:Math.floor((Math.random()*(new Date()).getTime())+1),
			order: i+1,
			bgstatus: (status.code >= 500?
						'danger':(status.code >= 400?
							'warning':(status.code >= 300?
								'redirect':'')))
		};
		
	},
	
	convertProgress = function(entries) {
		
		var startedDateTimeBefore = entries[0].progress.startedDateTime,
			progressContent, startedDateTime, startedTime,
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
			
			if(blocked >= 0) {
				progressContent += '<p class=\'clearfix bg-warning\'>';
				progressContent += '<strong>[Blocking]: </strong>';
				progressContent += ' <em> ' + harParser.timeFormatter(blocked, 3) + '</em>';
				progressContent += '</p>';
			}
			if(dns >= 0) {
				progressContent += '<p class=\'clearfix bg-last\'>';
				progressContent += '<strong>[DNS]: </strong>';
				progressContent += ' <em> ~' + harParser.timeFormatter(dns, 3) + '</em>';
				progressContent += '</p>';
			}
			if(connect >= 0) {
				progressContent += '<p class=\'clearfix bg-info\'>';
				progressContent += '<strong>[Connect]: </strong>';
				progressContent += ' <em> ~' + harParser.timeFormatter(connect, 3) + '</em>';
				progressContent += '</p>';
			}
			if(send >= 0) {
				progressContent += '<p class=\'clearfix bg-primary\'>';
				progressContent += '<strong>[Send]: </strong>';
				progressContent += ' <em> ~' + harParser.timeFormatter(send, 3) + '</em>';
				progressContent += '</p>';
			}
			if(wait >= 0) {
				progressContent += '<p class=\'clearfix bg-danger\'>';
				progressContent += '<strong>[Wait]: </strong>';
				progressContent += ' <em> ~' + harParser.timeFormatter(wait, 3) + '</em>';
				progressContent += '</p>';
			}
			if(receive >= 0) {
				progressContent += '<p class=\'clearfix bg-success\'>';
				progressContent += '<strong>[Receive]: </strong>';
				progressContent += ' <em> ~' + harParser.timeFormatter(receive, 3) + '</em>';
				progressContent += '</p>';
			}
			
			
			if(progressContent !== '' && startedTime >= 0) {
				entries[i].progressStart = '<strong>[Start Time]:</strong>';
				entries[i].progressStart += ' <em>';
				entries[i].progressStart += harParser.timeFormatter(startedTime, 3);
				entries[i].progressStart += '</em>';
			}
			else
				entries[i].progressStart = '';
			
			entries[i].progressContent = progressContent;
			
			
			entries[i].startPosition = harParser.pct(startedTime, lastTime);
			entries[i].blockedWidth = harParser.pct(blocked, lastTime);
			entries[i].dnsWidth = harParser.pct(dns, lastTime);
			entries[i].connectWidth = harParser.pct(connect, lastTime);
			entries[i].sendWidth = harParser.pct(send, lastTime);
			entries[i].waitWidth = harParser.pct(wait, lastTime);
			entries[i].receiveWidth = harParser.pct(receive, lastTime);
			
			
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
		startRender = page.pageTimings._startRender || false,
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
			if(hEntry.pageref && hEntry.pageref === id)
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

		lastTimeArray.push(
			(hEntry.progress.total + hEntry.progress.startedDateTime) -
			entries[0].progress.startedDateTime
		);
	}

	
	lastTime = Math.max.apply(null, lastTimeArray);
	
	if(onContentLoad)
		onContentLoadText = harParser.pct(onContentLoad, lastTime);
	
	for(i=0;i<ilen;i++) {
		entries[i].windowloaded = '<span class="windowloaded" data-toggle="tooltip" ';
		entries[i].windowloaded += 'title="[Page Loaded] ('+ harParser.timeFormatter(onLoad) +')" ';
		entries[i].windowloaded += 'style="left:' + harParser.pct(onLoad,lastTime) + '"></span>';
		
		if(onContentLoad) {
			entries[i].domloaded = '<span class="domloaded" data-toggle="tooltip" ';
			entries[i].domloaded += 'title="[DOMContentLoaded] (';
			entries[i].domloaded += harParser.timeFormatter(onContentLoad)+')"';
			entries[i].domloaded += ' style="left:' + onContentLoadText + '"></span>';
		}
		else
			entries[i].domloaded = '';
		
		if(startRender) {
			entries[i].renderstarted = '<span class="renderstarted" data-toggle="tooltip" ';
			entries[i].renderstarted += 'title="[Start Render] (';
			entries[i].renderstarted += harParser.timeFormatter(startRender) +')" ';
			entries[i].renderstarted += 'style="left:';
			entries[i].renderstarted += harParser.pct(startRender,lastTime) + '"></span>';
		}
		else
			entries[i].renderstarted = '';
	}
	
	
	
	
	entries = convertProgress(entries);
	
	entries.title = page.title;
	
	entries.info = '<th>' + entries.length + ' [requests]</th>' + 
						'<th colspan="3" class="text-right">' + 
						harParser.dataSizeFormatter(totalSize) + 
						' (' + harParser.dataSizeFormatter(totalCompressedSize) + 
						' [compressed])</th>' + 
						'<th class="text-center">' + 
						(onContentLoad !== false?
							'(' + harParser.timeFormatter(onContentLoad) + ') ':'') + 
							harParser.timeFormatter(onLoad) + '</th>';
	
	return entries;
	
	
};

harParser.decode = function(str) {
	'use strict';
	var _str;
	try {
		_str = decodeURIComponent(str);
	}
	catch(e) {
		try {
			_str = decodeURI(str);
		}
		catch(ee) {
			try {
				_str = unescape(str);
			}
			catch(eee) {
				_str = str;
			}
		}
	}
	return _str;
};
//Return request method with strong tag, or empty if GET
harParser.parseMethod = function(method) {
	'use strict';
	if(method.toLowerCase() === 'get')
		return '';
	
	return method && harParser.strong(method) || '';
};

harParser.urlRe = /([^:]+:\/+)([^\/]*)(\/?(?:\/?([^\/\?\#]*))*)(.*)/i;
harParser.urlDataRe = /^data:(\w+\/\w+);(?:base64,)?(charset=[^,]+,)?(.+)$/i;

//Parse url and return an object with necessary attributes
harParser.parseUrl = function(url, complete) {
	'use strict';
	var urlMatch = url.match(harParser.urlRe),
		urlFile;
	
	if(!urlMatch) {
		if(!url.indexOf('data:')) {
			urlFile = harParser.strong('Data:');
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
			else if(!urlFile)
				urlFile = '/';
		}
		else
			urlFile = urlMatch[4];
	}
	
	urlFile = urlFile.replace(/^\s*/g,'').replace(/\s*$/g,'');
	
	if(!url.indexOf('https'))
		urlFile = '<strong class="text-success">' + urlFile + '</strong>';
	
	return {
		params: harParser.decode(urlMatch && urlMatch[5] || ''),
		file: urlFile,
		complete:url
	};
};
//Parse status + statusText and return an object with necessary attributes
harParser.parseStatus = function(code, statusText) {
	'use strict';
	var status = code;
	
	statusText = statusText || '';
	
	if(code >= 500)
		status = harParser.strong(code, 'text-danger');
	else if(code >= 400)
		status = harParser.strong(code, 'text-warning');
	else if(code < 100)
		status = harParser.em(code, 'text-muted');
	
	
	return {
		code: code,
		status: status,
		complete: code + (statusText?(' ' + statusText):'')
	};
	
};
//Return object with original and compressed size formatted and without format
harParser.parseSize = function(size, compressed, status) {
	'use strict';
	var mainSize = compressed;
	
	if(compressed < 0)
		mainSize = 0;
	else if(compressed === 0)
		mainSize = size;
	
	mainSize = harParser.dataSizeFormatter(mainSize);

	if(status === 304)
		mainSize = harParser.em(mainSize);
	else if((status === 200 || !status) && (!compressed || compressed < 0))
		mainSize = harParser.strong(mainSize);
	
	
	return {
		originalSize: size + ' Bytes',
		originalCompressed: compressed + ' Bytes',
		size: mainSize,
		complete: size,
		compressed: compressed
	};
};
//Return object with separated mime type informations
harParser.parseMime = function(mimeType, url) {
	'use strict';
	var inline = false,
		mime;
	
	if(!mimeType && url && !url.indexOf('data:')) {
		mimeType = url.match(harParser.urlDataRe);
		
		if(mimeType && mimeType[1]) {
			mimeType = mimeType[1] + '; ';
			mimeType += (mimeType[2] && mimeType[2].substr(0,mimeType[2].length-1) || '');
		}
		else
			mimeType = false;
		
		inline = true;
	}
	
	
	if(mimeType) {
		mime = mimeType.split(';')[0].split('/');
		
		return {
			complete: mimeType.replace('; ', ''),
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
};
//Parse and return content (html, css, images...)
harParser.parseContent = function(content, url, mime, htmlEncode) {
	'use strict';
	var tabs = '',
		result = '',
		_result = '';
	
	if(mime.base === 'image' || htmlEncode) {
		if(content || !url.indexOf('data:')) {
			tabs += '<li><a href="#content">[Content]</a></li>';
			result += '<div class="content">';
			
			
			if(mime.base === 'image') {
				if(content) {
					result += '<img src="data:' + mime.base + '/' + mime.type;
					result += ';base64,' + content + '" />';
				}
				else
					result += '<img src="' + url + '" />';
			}
			else {
				if(content) {
					_result = htmlEncode(content);
					result += '<pre class="pre-scrollable">' + _result + '</pre>';
				}
				else {
					_result = htmlEncode(url);
					result += '<pre class="pre-scrollable">' + _result + '</pre>';
				}
			}
			
			result += '</div>';
			
		}
		else {
			tabs += '<li><a href="#content">[Content]</a></li>';
			result += '<div class="content">';
			if(mime.base === 'image') {
				if(content) {
					result += '<img src="data:' + mime.base + '/' + mime.type;
					result += ';base64,' + content + '" />';
				}
				else
					result += '<img src="' + url + '" />';
			}
			result += '</div>';
		}
	}
	return {
		tabs: tabs,
		result: result,
		_result: _result
	};
};
//Return object with progress informations
harParser.parseProgress = function(entry) {
	'use strict';
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
};
//Add tag strong and classname
harParser.strong = function(str,cname) {
	'use strict';
	if(cname)
		cname = ' class="' + cname + '"';
	else
		cname = '';
	return '<strong' + cname + '>' + str + '</strong>';
};
//Add tag em and classname
harParser.em = function(str, cname) {
	'use strict';
	if(cname)
		cname = ' class="' + cname + '"';
	else
		cname = '';
	return '<em' + cname + '>' + str + '</em>';
};
//Format size to show
harParser.dataSizeFormatter = function(value, precision) {
	'use strict';
	var ext = [' Bytes', ' KB', ' MB', ' GB', ' TB'],
		i = 0;
	
	value = value >= 0 ? value : 0;
	
	while(value > 1024 && i < (ext.length - 1)) {
		value /= 1024;
		i++;
	}
	
	return harParser.precisionFormatter(value, precision || 2) + ext[i];
};
//Format float point precision
harParser.precisionFormatter = function(number, precision) {
	'use strict';
	var matcher, fPoint;
	precision = precision || 2;
	
	
	number = number.toFixed(precision);
	
	if(precision === '0')
		return number;
	
	fPoint = number.split('.')[1];
	
	matcher = fPoint.match(/0+/);
	
	if(matcher && matcher[0].length === fPoint.length) {
		return number.split('.')[0];
	}
	else {
		//Need to think on how to make this 'translatable'
		//Not everyone use dot (.) as separator
		return number;//.replace('.', ',');
	}
};
//Calculate pct value
harParser.pct = function(value, pct, symbol) {
	'use strict';
	if(!value)
		return 0;
	symbol = symbol || '%';
	return ((value * 100) / pct) + symbol;
};
//Format time based on miliseconds
harParser.timeFormatter = function(time, precision) {
	'use strict';
	var ext = ['ms', 's', 'min', 'h'],
		div = [1000, 60, 60, 60],
		i = 0;
	
	time = time >= 0 ? time : 0;
	
	while(time >= div[i] && i < (ext.length - 1)) {
		time /= div[i];
		i++;
	}
	
	return harParser.precisionFormatter(time, precision || 2) + ext[i];
};

harParser.decoder = function(value) {
	'use strict';
	
	var j = 5;
	
	while(j-- && value.indexOf('%') !== -1 && value !== '')
		value = harParser.decode(value);
	
	return value;
};
harParser.decodeObj = function(objList) {
	'use strict';
	var newObjList = [],
		i = 0,
		ilen, obj;
	
	if(!objList || !objList.length)
		return objList;
	
	for(ilen=objList.length;i<ilen;i++) {
		obj = objList[i];
		newObjList.push({
			name:obj.name,
			value:harParser.decoder(obj.value)
		});
	}
	
	return newObjList;
	
};

harParser.filterObjList = function(objList, attr, filter) {
	'use strict';
	
	var newObjList = [],
		i = 0,
		ilen,
		obj;
	
	if(!filter)
		return objList;
	
	for(ilen=objList.length;i<ilen;i++) {
		obj = objList[i];
		if(obj[attr].indexOf(filter) === -1)
			newObjList.push(obj);
	}
	
	return newObjList;
};


harParser.objToDl = function(objList) {
	'use strict';
	var dl = '<dl class="dl-horizontal">',
		i = 0,
		ilen = objList && objList.length,
		obj;
	
	if(!ilen)
		return '';
	
	for(;i<ilen;i++) {
		obj = objList[i];
		dl += '<dt>' + obj.name + '</dt>';
		dl += '<dd>' + obj.value.replace(/;/g, ';<br>') + '</dd>';
	}
	
	return (dl + '</dl>');
	
};

harParser.tabContainer = function(header, request, response) {
	'use strict';
	var tab = header.tab,
		decode = header.decode,
		filter = header.filter,
		rq = {},
		rp = {},
		rqTab = request[tab],
		rpTab = response[tab],
		result = {
			tabs:'',
			containers:''
		},
		tabCapitalized;
	
	
	if(filter) {
		rqTab = harParser.filterObjList(rqTab, 'name', filter);
		rpTab = harParser.filterObjList(rpTab, 'name', filter);
	}
	
	rq[tab] = harParser.objToDl(rqTab);
	rp[tab] = harParser.objToDl(rpTab);
	
	
	if(rq[tab] || rp[tab]) {
		if(decode) {
			rqTab = harParser.decodeObj(rqTab);
			rpTab = harParser.decodeObj(rpTab);
			rq['d' + tab] = harParser.objToDl(rqTab);
			rp['d' + tab] = harParser.objToDl(rpTab);
		}
		
		
		tabCapitalized = tab.charAt(0).toUpperCase() + tab.substr(1);
		
		result.tabs += '<li><a href="#' + tab + '">[' + tabCapitalized + ']</a></li>';
		
		result.containers += '<div class="' + tab + '">';
		
		if(rq[tab]) {
			result.containers += '<h3 class="headers-title">';
			result.containers += '<small>[Request ' + tabCapitalized + ']</small>';
			result.containers += '</h3>';
			result.containers += rq[tab];
		}
		
		if(rp[tab]) {
			result.containers += '<h3 class="headers-title">';
			result.containers += '<small>[Response '+ tabCapitalized + ']</small>';
			result.containers += '</h3>';
			result.containers += rp[tab];
		}
		
		result.containers += '</div>';
		
		
		if(decode) {
			
			result.tabs += '<li><a href="#parsed' + tab + '">';
			result.tabs += '[Parsed ' + tabCapitalized + ']';
			result.tabs += '</a></li>';
		
			result.containers += '<div class="parsed' + tab + '">';
			
			if(rq['d'+tab]) {
				result.containers += '<h3 class="headers-title"><small>';
				result.containers += '[Request ' + tabCapitalized + ']';
				result.containers += '</small></h3>';
				result.containers += rq['d' + tab];
			}
			
			if(rp['d'+tab]) {
				result.containers += '<h3 class="headers-title"><small>';
				result.containers += '[Response ' + tabCapitalized + ']';
				result.containers += '</small></h3>';
				result.containers += rp['d' + tab];
			}
			
			result.containers += '</div>';
			
			
		}
		
		
		
	}
	
	return result;
};