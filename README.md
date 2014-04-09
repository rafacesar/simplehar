# Simple Har
> Har viewer made simple

## Getting Started
This viewer can be used as a standalone opening `index.html` in your browser or you can use it as a [node](http://nodejs.org) app.
The viewer needs __Bootstrap(+3.0.0)__ and __jQuery(+1.11.0)__ to work.




### Using command line
Before using the app, install all the dependencies with:
```shell
npm install
```

And after installed you can run:
```shell
node index.js har=<harFile> html=<htmlFile> frame
```
### Parameters

#### har
Har source to be used as base

#### html
Html file to be generate with the har informations

#### frame
This option genarate a html file just with the div content, embedding the CSS and JS necessary to viewer work.

This options is good for embedding the html in another page. But the page must already have bootstrap and jQuery loaded.

