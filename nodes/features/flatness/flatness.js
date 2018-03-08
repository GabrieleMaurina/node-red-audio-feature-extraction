module.exports = function(RED){
  function flatnessNode(config){
  		const utils = require('../../../utils/utils')

  		this.name = 'flatness'
  		this.parameters = {}
  		utils.run(RED, this, config)
  }

  RED.nodes.registerType('flatness', flatnessNode)
}
