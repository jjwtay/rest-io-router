import request from './request'

export default function(routesArray, app, io) {
	routeExpress(routesArray, app)
	routeIo(routesArray, io)
}


export function routeExpress(routesArray, app) {
	let routes = routesArrayToObj(routesArray)
	Object.keys(routes).forEach(url => {
		Object.keys(routes[url]).forEach(method => {
			app[method](url, (req, res) => routes[url][method](req, res))
		})
	})	
}

export function routeIo(routesArray, io) {
	let routes = routesArrayToObj(routesArray)
	io.on('connection', (socket) => {
		socket.on('rest', (data) => {
			data.query = Object.assign({}, data.query, getUrlParams(data.url || "/default"))
			let url = data.url.split("?")[0]
			routes[url || "/default"][data.method || "get"](request.req(data), request.res(socket, data))
		})
	})		
}

function routesArrayToObj(routesArray) {
	let routes = {}
	routesArray.forEach(route => {
		if(!routes.hasOwnProperty(route[1])) {
			routes[route[1]] = {}
		}
		routes[route[1]][route[0]] = route[2]
	})
	return routes
}


function getUrlParams(url) {
	if(url.split("?").length === 1) {
		return {}
	}
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = url.split("?")[1],
		urlParams = {};

    while (match = search.exec(query)) {
       urlParams[decode(match[1])] = decode(match[2])
	}
	return urlParams
}