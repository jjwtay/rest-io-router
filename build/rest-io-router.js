'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (routesArray, app, io) {
	routeExpress(routesArray, app);
	routeIo(routesArray, io);
};

exports.routeExpress = routeExpress;
exports.routeIo = routeIo;

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routeExpress(routesArray, app) {
	var routes = routesArrayToObj(routesArray);
	Object.keys(routes).forEach(function (url) {
		Object.keys(routes[url]).forEach(function (method) {
			app[method](url, function (req, res) {
				return routes[url][method](req, res);
			});
		});
	});
}

function routeIo(routesArray, io) {
	var routes = routesArrayToObj(routesArray);
	io.on('connection', function (socket) {
		socket.on('rest', function (data) {
			data.query = Object.assign({}, data.query, getUrlParams(data.url || "/default"));
			var url = data.url.split("?")[0];
			routes[url || "/default"][data.method || "get"](_request2.default.req(data), _request2.default.res(socket, data));
		});
	});
}

function routesArrayToObj(routesArray) {
	var routes = {};
	routesArray.forEach(function (route) {
		if (!routes.hasOwnProperty(route[1])) {
			routes[route[1]] = {};
		}
		routes[route[1]][route[0]] = route[2];
	});
	return routes;
}

function getUrlParams(url) {
	if (url.split("?").length === 1) {
		return {};
	}
	var match,
	    pl = /\+/g,
	    // Regex for replacing addition symbol with a space
	search = /([^&=]+)=?([^&]*)/g,
	    decode = function decode(s) {
		return decodeURIComponent(s.replace(pl, " "));
	},
	    query = url.split("?")[1],
	    urlParams = {};

	while (match = search.exec(query)) {
		urlParams[decode(match[1])] = decode(match[2]);
	}
	return urlParams;
}
