/**
 * Clear a node
 @param {object} node - the node to clear
 */
const clearNode = (node = {}) => {
    return new Promise(async (resolve, reject) => {
        await node.toJson()
            .then(node => {
                delete node._id
                delete node.createdAt
                resolve(node)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { clearNode }
