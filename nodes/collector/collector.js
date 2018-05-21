module.exports = function(RED){
	function collectorNode(config){
		const FLOAT_SIZE = 4
		const FFT_LENGHT = parseInt(config.fftLength) || 512
		const FFT_SIZE = FLOAT_SIZE * FFT_LENGHT

		const utils = require('../../utils/utils')        

		var convert = (buf) => {
			var arr = []

			for(var i = 0; i < buf.length / FFT_SIZE; i++){
				arr.push([])
				for(var j = 0; j < FFT_LENGHT; j++){
					arr[i].push(buf.readFloatLE(i * FFT_SIZE + j * FLOAT_SIZE))
				}
			}
			
			return arr
		}

		//set configurations
		this.name = 'collector'
		this.parameters = {}

		//set msg preprocessing
		this.preMsg = (msg) => {
			msg.config.collector.stft = convert(msg.payload)
		}
		utils.run(RED, this, config)
	}

	RED.nodes.registerType("collector", collectorNode)
}
