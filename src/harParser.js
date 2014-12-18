var harParser = module.exports = function(har, htmlEncode) {
	'use strict';
	
	har = har.log;
	
	// if(!htmlEncode)
	// 	console.error('htmlEncode not found. The content tab will not be displayed');
	
	var
	
	verticalRowMarker = function(cname, title, value, left) {
		var result = '<span class="' + cname + '" data-toggle="tooltip" ';
		
		result += 'title="[' + title + '] (' + harParser.timeFormatter(value) +')" ';
		result += 'style="left:' + (parseFloat(left)>100?'100%':left) + '"></span>';
		
		return result;
	},
	
	sortEntries = function(a, b) {
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
		
	},
	
	filterEntryByPage = function(entries, id) {
		var newEntries, i, ilen, entry;
		if(id && id !== '') {
			newEntries = [];
			for(i=0, ilen=entries.length;i<ilen;i++) {
				entry = entries[i];
				if(entry.pageref && entry.pageref === id)
					newEntries.push(entry);
			}
			return newEntries;
		}
		return entries;
	},
	
	verticalMarkers = function(entries, params) {
		var i = 0,
			j = 0,
			ilen = entries.length,
			args = [
				{
					cname:'windowloaded',
					title:'Page Loaded',
					value:'onLoad',
					param1:'onLoad',
					param2:'lastTime',
					left:false,
					verify:true
				},
				{
					cname:'domloaded',
					title:'DOMContentLoaded',
					value:'load',
					left:'loadText',
					verify:params.load
				},
				{
					cname:'renderstarted',
					title:'Start Render',
					value:'start',
					param1:'start',
					param2:'lastTime',
					left:false,
					verify:params.start
				}
			],
			jlen = args.length;
		
		for(;i<ilen;i++) {
			for(j=0;j<jlen;j++) {
				if(args[j].verify)
					entries[i][args[j].cname] = verticalRowMarker(
						args[j].cname,
						args[j].title,
						params[args[j].value],
						params[args[j].left] ||
							harParser.pct(params[args[j].param1],params[args[j].param2])
					);
				else
					entries[i][args[j].cname] = '';
			}
		}
		
		return entries;
	},
	prepareInfo = function(requests, size, load) {
		var info = '<th>' + requests + ' [requests]</th>';
		info+= '<th colspan="3" class="text-right">';
		info+= size.total + ' (' + size.compressed + ' [compressed])</th>';
		info+= '<th class="text-center">';
		if(load.content)
			info+= '<span title="DOMContentLoaded" class="text-success">('+load.content+')</span> ';
		info+= '<span title="Page Loaded" class="text-danger">' + load.on + '</span></th>';
		
		return info;
	},
	parsePages = function(har) {
		var hars = har.pages.filter(function(page) {return !!page.id;});
		
		if(!hars.length)
			hars = [har.pages[0]];
		
		hars = hars.map(function(page) {
			var entries = filterEntryByPage(har.entries, page.id),
				pageTimings = page.pageTimings,
				onContentLoad = pageTimings.onContentLoad || false,
				onLoad = pageTimings.onLoad,
				totalSize = 0,
				totalCompressedSize = 0,
				lastTimeArray = [onLoad],
				i = 0,
				ilen = entries.length,
				progress = [],
				prop, lastTime, hResponse, hProgress, hEntry;
			
			entries.sort(sortEntries);
			
			for(;i<ilen;i++) {
				hEntry = entries[i];
				hResponse = hEntry.response;
				
				
				totalSize += hResponse.content.size;
				totalCompressedSize += hResponse.bodySize;
				
				hProgress = harParser.parseProgress(hEntry);
				progress.push(hProgress);
				
				
				hEntry = entries[i] = harParser.convertHar(hEntry, i, htmlEncode);
				
				lastTimeArray.push(
					(hProgress.total + hProgress.startedDateTime) - progress[0].startedDateTime
				);
			}

			
			lastTime = Math.max.apply(null, lastTimeArray);
			
			progress = harParser.convertProgress(progress, lastTime);
			
			for(i=0;i<ilen;i++) {
				hProgress = progress[i];
				for(prop in hProgress) {
					entries[i][prop] = hProgress[prop];
				}
			}
			
			entries = verticalMarkers(entries, {
				onLoad:onLoad,
				lastTime:lastTime,
				load:onContentLoad,
				loadText:onContentLoad?harParser.pct(onContentLoad, lastTime):'',
				start:pageTimings._startRender || false
			});
			
			
			
			
			
			
			entries.title = page.title;
			entries.pRef = page.id;
			
			if(onContentLoad !== false)
				onContentLoad = harParser.timeFormatter(onContentLoad);
			
			entries.info = prepareInfo(
				entries.length,
				{
					total:harParser.dataSizeFormatter(totalSize),
					compressed:harParser.dataSizeFormatter(totalCompressedSize)
				},
				{
					content:onContentLoad,
					on:harParser.timeFormatter(onLoad)
				}
			);
			
			return entries;
		});
		
		return hars;
		
	};
	
	return parsePages(har);
	
	
};
//Decode url texts
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
	
	return method && harParser.strong(method + ' ') || '';
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
		urlFile = harParser.strong(urlFile, 'text-success');
	
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
	else if((status === 200 || !status) && (!compressed || compressed < 0)) {
		if(status === 200 && compressed <= 0)
			mainSize = harParser.strong(mainSize, 'text-danger');
		else
			mainSize = harParser.strong(mainSize);
	}
	
	
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
	var timings = entry.timings,
		blocked = timings.blocked,
		dns = timings.dns,
		connect = timings.connect,
		send = timings.send,
		wait = timings.wait,
		receive = timings.receive,
		ssl = timings.ssl,
		_blocked = blocked >= 0?blocked:0,
		_dns = dns >= 0?dns:0,
		_connect = connect >= 0?connect:0,
		_send = send >= 0?send:0,
		_wait = wait >= 0?wait:0,
		_receive = receive >= 0?receive:0,
		_ssl = ssl >= 0?ssl:0;
	
	
	
	return {
		startedDateTime:(new Date(entry.startedDateTime)).getTime(),
		time: entry.time,
		blocked: blocked,
		dns: dns,
		connect: connect,
		send: send,
		wait: wait,
		receive: receive,
		ssl: ssl,
		total:	_blocked +
				_dns +
				_connect +
				_send +
				_wait +
				_receive +
				_ssl
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
//Decode multiple encoded text
harParser.decoder = function(text) {
	'use strict';
	
	var oldtext;
	
	do {
		oldtext = text;
		text = harParser.decode(text);
	}while(text !== oldtext);
	
	return text;
};
//Decode a list of objects
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
//Filter an attribute value in an object list
harParser.filterObjList = function(objList, attr, filter) {
	'use strict';
	
	var newObjList = [],
		i = 0,
		ilen,
		obj;
	
	if(!filter)
		return objList;
	
	filter = filter.toLowerCase();
	
	for(ilen=objList.length;i<ilen;i++) {
		obj = objList[i];
		if(!obj.hasOwnProperty(attr) || obj[attr].toLowerCase().indexOf(filter) === -1)
			newObjList.push(obj);
	}
	
	return newObjList;
};

//Generate a DL list based in an object list
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
//Generate an object with the tabs/titles and the content based in
//the request and response objects
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
		tabCapitalized,
		headersTitle = function(title, content) {
			return '<h3 class="headers-title"><small>['+ title +']</small></h3>' + content;
		},
		liTab = function(tabId, title) {
			return '<li><a href="#' + tabId + '">[' + title + ']</a></li>';
		};
	
	
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
		
		result.tabs += liTab(tab, tabCapitalized);
		
		result.containers += '<div class="' + tab + '">';
		
		if(rq[tab])
			result.containers += headersTitle('Request ' + tabCapitalized, rq[tab]);
		
		if(rp[tab])
			result.containers += headersTitle('Response ' + tabCapitalized, rp[tab]);
		
		result.containers += '</div>';
		
		
		if(decode) {
			
			result.tabs += liTab('parsed' + tab, 'Parsed ' + tabCapitalized);
		
			result.containers += '<div class="parsed' + tab + '">';
			
			if(rq['d' + tab])
				result.containers += headersTitle('Request ' + tabCapitalized, rq['d' + tab]);
			
			if(rp['d' + tab])
				result.containers += headersTitle('Response ' + tabCapitalized, rp['d' + tab]);
			
			
			result.containers += '</div>';
			
			
		}
		
		
		
	}
	
	return result;
};
// Convert progress data to an object with converted data and HTML to tooltip
harParser.convertProgress = function(progress, lastTime) {
	'use strict';
	
	var firstTime = progress[0].startedDateTime,
		i = 0,
		ilen = progress.length,
		result = [],
		progressContent, startedTime, r,
		steps = [
			{classname:'warning',title:'Blocking',step:'blocked'},
			{classname:'last',title:'DNS',step:'dns'},
			{classname:'info',title:'Connect',step:'connect'},
			{classname:'secondary',title:'SSL',step:'ssl'},
			{classname:'primary',title:'Send',step:'send'},
			{classname:'danger',title:'Wait',step:'wait'},
			{classname:'success',title:'Receive',step:'receive'}
		],
		step, j, jlen = steps.length, p,
		progressRow = function(bg, title, value) {
			if(value > 0) {
				var result = '<p class=\'clearfix bg-' + bg + '\'>';
				
				result += tinyRow(title, value);
				
				result += '</p>';
				
				return result;
			}
			return '';
		},
		tinyRow = function(title, value) {
			var result = '<strong>[' + title + ']: </strong> ',
				time = harParser.timeFormatter(value, 3);
			
			if(parseFloat(time) === 0 && value > 0)
				time = '< ' + harParser.timeFormatter(1, 3);
			
			result += '<em> ' + time + '</em>';
			return result;
		};
	
	
	for(;i<ilen;i++) {
		
		r = {};
		
		p = progress[i];
		
		startedTime = p.startedDateTime - firstTime;
		
		progressContent = '';
		
		for(j=0;j<jlen;j++) {
			step = steps[j];
			
			if(p[step.step] >= 0) {
				progressContent += progressRow(step.classname, step.title, p[step.step]);
				r[step.step + 'Width'] = harParser.pct(p[step.step], lastTime);
			}
			else
				r[step.step + 'Width'] = '0';
			
		}
		
		
		if(startedTime >= 0)
			r.progressStart = tinyRow('Start Time', startedTime);
		else
			r.progressStart = '';
		
		r.progressContent = progressContent;
		
		
		r.startPosition = harParser.pct(startedTime, lastTime);
		
		
		r.totalTime = harParser.timeFormatter(p.total);
		
		result.push(r);
	}
	
	return result;
	
};
// Convert a request into another object
harParser.convertHar = function(entry, i, htmlEncode) {
	'use strict';
	
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
		method: method,
		fullUrl: url.complete,
		fileName: url.file,
		params: url.params,
		status: status.status,
		fullStatus: status.complete,
		mime: (mime.type === 'plain' || !mime.type) && mime.base?mime.base:mime.type,
		fullMimeType: mime.complete,
		size: size.originalCompressed,
		fullSize: size.originalSize,
		sizeToShow: size.size,
		tabs: tabs,
		tabContainers: containers,
		fileContent: responseContent._result
	};
	
};