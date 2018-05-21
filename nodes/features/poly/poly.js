module.exports = function(RED){
	function polyNode(config){
		const utils = require('../../../utils/utils')

		//set configurations
		this.name = 'poly'
		this.parameters = {
			order: parseInt(config.order) || undefined
		}
		utils.run(RED, this, config)
	}

	RED.nodes.registerType("poly", polyNode)
}
