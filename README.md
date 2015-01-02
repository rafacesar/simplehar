# Simple Har
> Har viewer made simple

[![Build Status](https://travis-ci.org/rafacesar/simplehar.svg?branch=master)](https://travis-ci.org/rafacesar/simplehar)
## Getting Started
This viewer can be used within a server and accessing `index.html` in your browser or you can use it as a [node](http://nodejs.org) app.

You can also access [rafacesar.github.io/simplehar](http://rafacesar.github.io/simplehar/) and use it online!  
To understand how the information is displayed, check [the explanation](https://github.com/rafacesar/simplehar/blob/master/howto/docs.md).

The viewer needs __Bootstrap(+3.0.0)__ and __jQuery(+2.1.0)__ to work.

To install it as a node module you can run:
```shell
npm install simplehar
```
Or globally:
```shell
npm install -g simplehar
```

### Using as a dependency/programmatically
```javascript
var simplehar = require('simplehar'),
	path = require('path'),
	harFile = path.join('harFolder', 'myHarFile.har'),
	htmlFile = path.join('htmlFolder', 'myHtmlFile.html');

simplehar({
	har:harFile,
	html:htmlFile,
	lng:false
});


//<style>...</style>...html...<script>...</script>
var result = simplehar({
	har:harFile,
	html:htmlFile,
	lng:false,
	frame:true,
	return:true
});


//[
//	<style>...</style>...html...<script>...</script>,
//	<style>...</style>...html...<script>...</script>
//]
var result = simplehar({
	har:multipleSitesHarFile,
	lng:false,
	frame:true,
	return:true
});


//{
//	css:'...',
//	js:'...',
//	html:'...'
//}
var result = simplehar({
	har:harFile,
	html:htmlFile,
	lng:false,
	frame:true,
	return:true,
	frameContent:{
		css:false,
		js:false
	}
});

//{
//	css:'...',
//	js:'...',
//	html:['...', '...']
//}
var result = simplehar({
	har:multipleSitesHarFile,
	lng:false,
	frame:true,
	return:true,
	frameContent:{
		css:false,
		js:false
	}
});
```

### Using command line
After installed you can simply run:
```shell
node ./node_module/.bin/simplehar <harFile>
```

Or:
```shell
node ./node_module/.bin/simplehar <harFile> <htmlFile>
```

Or a complete command:
```shell
node ./node_module/.bin/simplehar <htmlFile> <harFile> lng=pt-BR frame
```

Or globally:
```shell
simplehar <harFile>
```

## Parameters
### harFile (*Required*)
Har source to be used as base (it needs the `.har` extension)

### htmlFile (*Optional*)
Html file to be generate with the har informations (it needs the `.html` extension)
__Via Command Line:__
>This parameter __will be ignored__ when using multiple sites in one harFile

__Via Programmatically (_when using multiple sites_)__
> The string `{id}` __will be replaced__ by the id of the page on harFile.
> If the `{id}` is __missing__, this parameter __will be ignored__

### frame (*Optional*)
This option genarate a html file just with the div content, embedding the CSS and JS necessary to viewer work.
> This options is good for embedding the html in another page. But the page must already have bootstrap and jQuery loaded.

### lng (*Optional*)
Language used to translate (from src/translate.json) (e.g pt-BR)


### frameContent (*Optional* - *`Used only as dependency/programmatically`*)
Object specifying if the html should have JS or CSS inline
