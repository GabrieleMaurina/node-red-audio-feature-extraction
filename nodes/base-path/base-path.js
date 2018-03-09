module.exports = function(RED){
    function basePathNode(config){
  		const utils = require('../../utils/utils')

  		this.name = 'basePath'

  		this.parameters = {
  			path: config.basePath || undefined
  		}
  		utils.run(RED, this, config)
    }

    RED.nodes.registerType("base path", basePathNode)
}
