module.exports = function(RED){
    function converterNode(config){
        const utils = require('../../utils/utils')

        var int16LE = (buf) => {
            var arr = []
            for(var i = 0; i < buf.length; i += 2){
                arr.push(buf.readInt16LE(i))
            }
            return arr
        }

        this.name = 'converter'
        this.parameters = {
            orig_sr: parseInt(config.origSr) || 44100,
            target_sr: parseInt(config.targetSr) || 1000,
            resType: config.resType || 'kaiser_best'
        }
        this.readMsg = (msg) => {
            msg.config.converter.y = int16LE(msg.payload)
        }
        utils.run(RED, this, config)
    }

    RED.nodes.registerType("converter", converterNode)
}
