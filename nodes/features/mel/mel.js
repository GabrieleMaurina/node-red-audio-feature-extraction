module.exports = function(RED){
	function melNode(config){
		const utils = require('../../../utils/utils')

		//set configurations
		this.name = 'mel'
		this.parameters = {
			power: Number(config.power) || undefined
		}
		utils.run(RED, this, config)
	}
	
	RED.nodes.registerType("mel", melNode)
}