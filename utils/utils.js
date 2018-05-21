const status = require('./status.js')
const {spawn} = require('child_process')

const pcmd = process.platform === 'linux' ? 'python3' : 'python'

const initProc = (node) => {
	if (node.proc == null){
		node.proc = spawn(pcmd, [__dirname + '/../python/extract.py'], ['pipe', 'pipe','pipe'])

		node.proc.stdout.on('data', (data) => {
			try{
				node.status(status.DONE)
				var msg = {}
				if(node.msg){
					msg = node.msg
				}
				msg.payload = data.toString()
				try{
					msg.payload = JSON.parse(msg.payload)
				}
				catch(err){}
				node.send(msg)
			}
			catch(err){}
		})

		node.proc.stderr.on('data', (data) => {
			try{
				node.status(status.ERROR)
				var msg = {}
				if(node.msg){
					msg = node.msg
				}
				msg.payload = data.toString()
				node.send(msg)
			}
			catch(err){}
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

		const checkLast = () => {
			node.last = last(RED, node)
			if(node.last){
				node.proc = null
				initProc(node)
			}
		}

		RED.events.setMaxListeners(100)
		RED.events.addListener("nodes-started", checkLast)

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
			RED.events.removeListener("nodes-started", checkLast)
			if(node.proc != null){
				node.proc.kill()
				node.proc = null
			}
			node.status(status.NONE)
			done()
		})
	}
}
