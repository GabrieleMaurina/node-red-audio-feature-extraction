module.exports = function(RED){
    function stftNode(config){
		const utils = require('../../utils/utils')
		
		this.name = 'stft'

		this.parameters = {
			n_fft: parseInt(config.nFft) || undefined,
			hop_length: parseInt(config.hopLength) || undefined,
			win_length: parseInt(config.windowLength) || undefined
		}
		utils.run(RED, this, config)
    }
	
    RED.nodes.registerType("stft", stftNode)
}