module.exports = function(RED){
  function contrastNode(config){
  		const utils = require('../../../utils/utils')

  		this.name = 'contrast'
  		this.parameters = {}
  		utils.run(RED, this, config)
  }

  RED.nodes.registerType("contrast", contrastNode)
}
