const status = require('./status.js')
const {spawn} = require('child_process')

const initProc = (node) => {
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
}

const python = (node, data) => {
	initProc(node)
	node.proc.stdin.write(JSON.stringify(data) + '\n')
}

const last = (RED, node) => {
	return !node.wires[0].some((n) => RED.nodes.getNode(n).parameters != undefined)
}

module.exports = {
	run: (RED, node, config) => {
		RED.nodes.createNode(node, config)
		node.status(status.NONE)
		node.last = false

		RED.events.setMaxListeners(100)
		RED.events.on("nodes-started", ()=>{
			node.last = last(RED, node)
			if(node.last){
				node.proc = null
				initProc(node)
			}
		})

		node.on('input', (msg) => {
			if(!msg.config){
				msg.config = {}
			}
			msg.config[node.name] = node.parameters

			if(node.readMsg){
				node.readMsg(msg)
			}

			if(node.last){
				node.status(status.PROCESSING)
				node.msg = msg
				python(node, msg.config)
			}
			else{
				node.send(msg)
			}
		})

		node.on('close', (done) => {
			if(node.proc != null){
				node.proc.kill()
				node.proc = null
			}
			node.status(status.NONE)
			done()
		})
	}
}
