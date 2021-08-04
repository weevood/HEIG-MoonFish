const { clearNode } = require('./clearNode')

/**
 * Clear a node
 @param {array} nodes - an array of nodes to clear
 */
const clearNodes = async (nodes = []) => {
    let res = []
    for (let node of nodes) {
        res.push(await clearNode(node))
    }
    return res
}

module.exports = { clearNodes }
