module.exports = function(RED){
    function persistanceNode(config){
		const utils = require('../../utils/utils')
		
		this.name = 'persistance'
		this.parameters = {
			save: config.save || undefined
		}
		utils.run(RED, this, config)
    }
	
    RED.nodes.registerType("persistance", persistanceNode)
}