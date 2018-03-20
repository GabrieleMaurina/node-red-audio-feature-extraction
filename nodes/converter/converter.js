module.exports = function(RED){
    function converterNode(config){
        const utils = require('../../utils/utils')

        var convert = (buf) => {
            var arr = []
            for(var i = 0; i < buf.length; i += 2){
                arr.push(buf.readInt16LE(i) / 32767)
            }
            return arr
        }

        this.name = 'converter'
        this.parameters = {
            orig_sr: parseInt(config.origSr) || 44100,
            target_sr: parseInt(config.targetSr) || 44100,
            res_type: config.resType || 'kaiser_best'
        }
        this.readMsg = (msg) => {
            msg.config.converter.y = convert(msg.payload)
        }
        utils.run(RED, this, config)
    }

    RED.nodes.registerType("converter", converterNode)
}
