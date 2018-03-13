const status = require('./status.js')
const {spawn} = require('child_process')

const python = (node, data) => {
	node.status(status.PROCESSING)

	if (node.proc == null){
		node.proc = spawn('python', [__dirname + '\\..\\python\\extract.py'], ['pipe', 'pipe','pipe'])

		node.proc.stdout.on('data', (data) => {
		  node.status(status.DONE)
			node.msg.payload = data.toString()
			node.send(node.msg)
		})

		node.proc.stderr.on('data', (data) => {
			node.status(status.ERROR)
			node.msg.payload = data.toString()
			node.send(node.msg)
		})

		node.proc.on('exit', () => {
		  node.proc = null
		})
	}

	node.proc.stdin.write(JSON.stringify(data) + '\n')
}

const last = (RED, node) => {
	return !node.wires[0].some((n) => RED.nodes.getNode(n).parameters != undefined)
}

module.exports = {
	run: (RED, node, config) => {
	  RED.nodes.createNode(node, config)
		node.status(status.NONE)

		node.proc = null

		node.on('input', (msg) => {
			if(!msg.config){
				msg.config = {}
			}
			msg.config[node.name] = node.parameters

			if(last(RED, node)){
				node.msg = msg
				python(node, msg.config)
			}
			else{
				node.send(msg)
			}
		})

		node.on('close', () => {
			if(node.proc != null){
				node.proc.kill()
				node.proc = null
			}
			node.status(status.NONE)
    })
	}
}
