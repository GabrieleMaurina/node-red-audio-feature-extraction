module.exports = function(RED){
    function tonnetzNode(config){
  		const utils = require('../../../utils/utils')

  		this.name = 'tonnetz'
  		this.parameters = {}
  		utils.run(RED, this, config)
    }

    RED.nodes.registerType("tonnetz", tonnetzNode)
}
