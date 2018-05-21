module.exports = function(RED){
	function mfccNode(config){
		const utils = require('../../../utils/utils')

		//set configurations
		this.name = 'mfcc'
		this.parameters = {
			n_mfcc: parseInt(config.nMFCC) || undefined
		}
		utils.run(RED, this, config)
	}

	RED.nodes.registerType("mfcc", mfccNode)
}
