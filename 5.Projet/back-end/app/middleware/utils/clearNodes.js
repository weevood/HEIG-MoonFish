const { clearNode } = require('./clearNode');

/**
 * Clear a node
 @param {array} nodes - an array of nodes to clear
 */
const clearNodes = (nodes = []) => {
    let res = []
    for (let node of nodes) {
        res.push(clearNode(node))
    }
    return res
}

module.exports = { clearNodes }
