/**
 * Clear a node
 @param {object} node - the node to clear
 */
const clearNode = (node = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await node.toJson()
                .then(json => node = json)
                .catch(error => {
                    reject(error)
                })
        } catch (err) {
            if (node.properties)
                node = node.properties
        }
        if (node.status && node.status.low)
            node.status = node.status.low
        delete node._id
        delete node.createdAt
        resolve(node)
    })
}

module.exports = { clearNode }
