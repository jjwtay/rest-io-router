# rest-io-router

## Shared routing for socket.io and http requests

## Installation &nbsp;
**With [node](http://nodejs.org) [installed]:**
```sh

$ npm install rest-io-router --save
```

## Usage 

### routes.js
```sh
	export default [

		[	'get',	'/users',	(req, res) => {	res.send("hello world") }],
		[	'post',	'/users',	(req, res) => {	res.send("post to users")}]

	]
```

### server.js

```sh
import routes from './routes'
import router from '/.rest-io-router'

...

router(routes, app, io)
```

### client.js

```sh
	io.emit('rest', {method: 'get', url: '/users'})

	io.on('rest', (data) => console.log(data)
	//console logs => "hello world"

```

## For simpler promised based client api checkout https://github.com/jjwtay/rest-io-client