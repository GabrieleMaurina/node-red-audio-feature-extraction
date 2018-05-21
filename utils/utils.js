const status = require('./status.js')
const {spawn} = require('child_process')

//use 'python3' on linux and 'python' on anything else
const pcmd = process.platform === 'linux' ? 'python3' : 'python'

//initialize chil process
const initProc = (node) => {
	if (node.proc == null){
		node.proc = spawn(pcmd, [__dirname + '/../python/extract.py'], ['pipe', 'pipe','pipe'])

		//handle results
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

		//handle errors
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

		//handle crashes
		node.proc.on('exit', () => {
			node.proc = null
		})
	}
}

//send request to python script
const python = (node, data) => {
	initProc(node)
	node.proc.stdin.write(JSON.stringify(data) + '\n')
}

//check if any downstream node is from this package
const last = (RED, node) => {
	return !node.wires[0].some((n) => RED.nodes.getNode(n).parameters != undefined)
}

module.exports = {
	run: (RED, node, config) => {
		RED.nodes.createNode(node, config)
		node.status(status.NONE)
		node.last = false

		//check if it is the last node in the flow to be from this package
		const checkLast = () => {
			node.last = last(RED, node)
			if(node.last){
				node.proc = null
				//if last, init child process
				initProc(node)
			}
		}

		RED.events.setMaxListeners(100)
		RED.events.addListener("nodes-started", checkLast)

		node.on('input', (msg) => {
			if(!msg.config){
				msg.config = {}
			}
			//append own configuration to message
			msg.config[node.name] = node.parameters

			//allow node to preprocess message
			if(node.preMsg){
				node.preMsg(msg)
			}

			//if last, execute python script
			if(node.last){
				node.status(status.PROCESSING)
				node.msg = msg
				python(node, msg.config)
			}
			//otherwise forward message
			else{
				node.send(msg)
			}
		})

		//when node is closed, kill child process
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
