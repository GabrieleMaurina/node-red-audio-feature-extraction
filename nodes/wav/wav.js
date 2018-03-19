module.exports = function(RED){
    function wavNode(config){
  		const utils = require('../../utils/utils')

  		this.name = 'wav'
  		this.parameters = {
  			save: config.save || undefined,
            file: config.file || undefined
  		}
  		utils.run(RED, this, config)
    }

    RED.nodes.registerType("wav", wavNode)
}
