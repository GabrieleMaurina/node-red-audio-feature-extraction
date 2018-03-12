module.exports = function(RED){
    function chromaNode(config){
  		const utils = require('../../../utils/utils')

  		this.name = 'chroma'
  		this.parameters = {
  			norm: Number(config.norm) || undefined,
  			tuning: Number(config.tuning) || undefined
  		}
  		utils.run(RED, this, config)
    }

    RED.nodes.registerType("chroma", chromaNode)
}
