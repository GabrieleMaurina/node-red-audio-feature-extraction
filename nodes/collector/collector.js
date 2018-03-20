module.exports = function(RED){
    function collectorNode(config){
    	const UINT16_SIZE = 2
        const FFT_LENGHT = 512
        const FFT_SIZE = UINT16_SIZE * FFT_LENGHT

        const utils = require('../../utils/utils')        

        var convert = (buf) => {
            var arr = []

            for(var i = 0; i < buf.length / FFT_SIZE; i++){
                arr.push([])
                for(var j = 0; j < FFT_LENGHT; j++){
	                arr[i].push(buf.readUInt16LE(i * FFT_SIZE + j * UINT16_SIZE) / 16384)
	            }
            }
            
            return arr
        }

        this.name = 'collector'
        this.parameters = {}
        this.readMsg = (msg) => {
            msg.config.collector.stft = convert(msg.payload)
        }
        utils.run(RED, this, config)
    }

    RED.nodes.registerType("collector", collectorNode)
}
