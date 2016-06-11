"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	req: function req(socketRequest) {
		return socketRequest;
	},
	res: function res(socket, socketRequest) {
		var success = true;
		var r = {
			send: function send(data) {
				return socket.emit('rest', { guid: socketRequest.guid, data: data, success: success });
			},
			status: function status(stat) {
				if (stat === "400" || stat == "404") {
					success = false;
				} else {
					success = true;
				}
			}
		};
		return r;
	}
};