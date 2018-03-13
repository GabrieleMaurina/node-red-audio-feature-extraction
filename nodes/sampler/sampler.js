module.exports = function(RED){
    function samplerNode(config){
  		const utils = require('../../utils/utils')

  		this.name = 'sampler'
  		this.parameters = {
  			file: config.file || undefined,
  			sr: parseInt(config.sampleRate) || null,
  			mono: Boolean(config.mono) || undefined,
  			offset: Number(config.offset) || undefined,
  			duration: Number(config.duration) || undefined,
  			res_type: config.resType || undefined
  		}
  		utils.run(RED, this, config)
    }

    RED.nodes.registerType("sampler", samplerNode)
}
