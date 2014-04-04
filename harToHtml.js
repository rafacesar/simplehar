module.exports = function(har) {
	var prepareHar = function(har) {
		var newHar = {
			entries:[]
		},
		entries = har.log.entries,
		i = 0, ilen = entries.length,
		entrie, url, filename, size, responseHeaders, requestHeaders, tabs, content, responseContent, mimeType, _responseContent;
		
		
		for(;i<ilen;i++) {
			entrie = entries[i];
			
			url = entrie.request.url.split('/');
			filename = url[url.length - 1].split('#')[0].split('?')[0];
			
			responseHeaders = objListToHtml(entrie.response.headers, ['cookie']);
			requestHeaders = objListToHtml(entrie.request.headers, ['cookie']);
			responseCookies = objListToHtml(entrie.response.cookies);
			requestCookies = objListToHtml(entrie.request.cookies);
			responseContent = entrie.response.content.text;
			
			size = entrie.response.bodySize;
			
			mimeType = entrie.response.content.mimeType.split(";")[0];
			tabs = '';
			content = '';
			
			if(responseHeaders || requestHeaders) {
				tabs += '<li><a href="#headers">Headers</a></li>';
				content += '<div class="headers"><h3>Request Headers</h3>' + requestHeaders + '<h3>Response Headers</h3>' + responseHeaders + '</div>';
			}
			
			if(requestCookies || responseCookies) {
				tabs += '<li><a href="#cookies">Cookies</a></li>';
				content += '<div class="cookies"><h3>Request Cookies</h3>' + requestCookies + '<h3>Response Cookies</h3>' + responseCookies + '</div>';
			}
			
			if(responseContent) {
				tabs += '<li><a href="#content">Content</a></li>';
				content += '<div class="content">';
				if(mimeType.split('/')[0] == 'image') {
					content += '<img src="data:' + mimeType + ';base64,' + responseContent + '" />';
				}
				else {
					_responseContent = document.createElement('span');
					responseContent = document.createTextNode(responseContent);
					_responseContent.appendChild(responseContent);
					content += '<pre>' + _responseContent.innerHTML + '</pre>';
				}
				content += '</div>';
			}
			
			newHar.entries.push({
				fullUrl: url.join('/'),
				fileName: filename || '/',
				params:url[url.length - 1].substr(filename.length),
				responseStatus:entrie.response.status,
				responseTextStatus:entrie.response.statusText,
				mimeType:mimeType,
				fullSize:size,
				formatedSize:Math.round(parseInt(size,10) / 1024),
				tabs:tabs,
				tabContainers:content
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
	};
	
	return prepareHar(har);
	
};