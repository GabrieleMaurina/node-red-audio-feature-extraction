module.exports = function(RED){
	function centroidNode(config){
		const utils = require('../../../utils/utils')

		//set configurations
		this.name = 'centroid'
		this.parameters = {}
		utils.run(RED, this, config)
	}

	RED.nodes.registerType('centroid', centroidNode)
}
