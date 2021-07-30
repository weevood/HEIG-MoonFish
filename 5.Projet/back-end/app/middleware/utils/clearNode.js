/**
 * Clear a node
 @param {object} node - the node to clear
 */
const clearNode = (node = {}) => {
    delete node._id
    delete node.createdAt
    return node
}

module.exports = { clearNode }
