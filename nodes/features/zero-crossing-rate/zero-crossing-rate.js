module.exports = function(RED){
	function zeroCrossingRateNode(config){
		const utils = require('../../../utils/utils')

		//set configurations
		this.name = 'zeroCrossingRate'
		this.parameters = {
			frame_length: Number(config.frameLength) || undefined,
			hop_length: Number(config.hopLength) || undefined,
			center: Boolean(config.center) || undefined
		}
		utils.run(RED, this, config)
	}

	RED.nodes.registerType("zeroCrossingRate", zeroCrossingRateNode)
}
