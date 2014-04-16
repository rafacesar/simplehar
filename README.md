# Simple Har
> Har viewer made simple

## Getting Started
This viewer can be used as a standalone opening `index.html` in your browser or you can use it as a [node](http://nodejs.org) app.
The viewer needs __Bootstrap(+3.0.0)__ and __jQuery(+2.1.0)__ to work.




### Using command line
After installed you can simply run:
```shell
node ./bin/simplehar <harFile>
```

Or:
```shell
node ./bin/simplehar <harFile> <htmlFile>
```

Or a complete command:
```shell
node ./bin/simplehar <htmlFile> <harFile> lng=pt-BR frame
```

## Parameters
### harFile (*Required*)
Har source to be used as base (it needs the `.har` extension)

### htmlFile (*Optional*)
Html file to be generate with the har informations (it needs the `.html` extension)

### frame (*Optional*)
This option genarate a html file just with the div content, embedding the CSS and JS necessary to viewer work.

This options is good for embedding the html in another page. But the page must already have bootstrap and jQuery loaded.

### lng (*Optional*)
Language used to translate (from src/translate.json) (e.g pt-BR)


