export default {
	req: (socketRequest) => {
		return socketRequest
	},
	res: (socket, socketRequest) => {
		let success = true
		let r = {
			send: (data) => socket.emit('rest', {guid: socketRequest.guid, data: data, success: success}),
			status: function(stat) {
				if(stat === "400" || stat == "404") {
					success = false
				} else {
					success = true
				}
			}
		}
		return r
	}
}
