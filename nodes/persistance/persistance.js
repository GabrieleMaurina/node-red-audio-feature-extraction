module.exports = function(RED){
	function persistanceNode(config){
		const utils = require('../../utils/utils')

		//set configurations
		this.name = 'persistance'
		this.parameters = {
			save: config.save || undefined,
			file: config.file || undefined
		}
		utils.run(RED, this, config)
	}

	RED.nodes.registerType("persistance", persistanceNode)
}
