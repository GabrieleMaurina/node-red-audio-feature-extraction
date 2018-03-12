module.exports = function(RED){
    function bufferNode(config){
      const status = require('../../utils/status')
      const node = this
      node.size = parseInt(config.size) || 100
      node.data = []

      RED.nodes.createNode(node, config)

  		node.status(status.NONE)
      node.on('input', (msg) => {
        node.status(status.PROCESSING)

        if(msg.payload instanceof Array){
          node.data = node.data.concat(msg.payload)
          if(node.data.length >= node.size){
            if(!msg.config){
              msg.config = {}
            }
            msg.config.samples = node.data.slice(0, node.size)
            node.data.splice(0, node.size)
            node.status(status.DONE)
            node.send(msg)
          }
        }

      })
    }

    RED.nodes.registerType("buffer", bufferNode)
}
