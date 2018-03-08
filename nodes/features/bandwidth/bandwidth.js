module.exports = function(RED){
  function bandwidthNode(config){
    const utils = require('../../../utils/utils')

    this.name = 'bandwidth'
    this.parameters = {
      norm: Boolean(config.norm) || undefined,
      power: Number(config.power) || undefined
    }
    utils.run(RED, this, config)
  }

  RED.nodes.registerType("bandwidth", bandwidthNode)
}
