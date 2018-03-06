const status = require('./status.js')
const {exec} = require('child_process')
const fs = require('fs')

const getFileName = (node) => {
	if(node.file == undefined){
		node.file = 0
	}
	
	return __dirname + '\\' + node.id + node.file++ + '.json'
}

const result = (err, node, msg, callback) => {
	if(err){
		msg.payload = err
		node.status(status.ERROR)
		node.send(msg)
	}
	else{
		callback()
	}
}

const python = (node, data, msg) => {
	node.status(status.PROCESSING)

	const file = getFileName(node)

	fs.writeFile(file, JSON.stringify(data), (err) => {
		result(err, node, msg, () => {
			exec('python "' + __dirname + '\\..\\python\\extract.py" "' + file + '"', (err, stdout, stderr) => {
				result(err, node, msg, () => {
					msg.payload = 'Features extracted.'
					node.status(status.DONE)
					node.send(msg)
				})
			})
		})
	})
}

const last = (RED, node) => {
	return !node.wires[0].some((n) => RED.nodes.getNode(n).parameters != undefined)
}

module.exports = {
	run: (RED, node, config) => {
	    RED.nodes.createNode(node, config)

		node.on('input', function(msg) {
			if(!msg.config){
				msg.config = {}
			}
			msg.config[node.name] = node.parameters	

			if(last(RED, node)){
				python(node, msg.config, msg)
			}
			else{
				node.send(msg)
			}
		})
	}
}