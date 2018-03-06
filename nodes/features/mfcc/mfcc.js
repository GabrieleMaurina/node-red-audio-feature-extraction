module.exports = function(RED){
    function mfccNode(config){
        const utils = require('../../../utils/utils')
        
        this.name = 'mfcc'
        this.parameters = {}
        utils.run(RED, this, config)
    }
    
    RED.nodes.registerType("mfcc", mfccNode)
}