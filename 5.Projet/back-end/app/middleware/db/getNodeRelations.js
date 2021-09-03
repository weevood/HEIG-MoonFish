const neo4j = require('../../../config/neode')

/**
 * Get nodes from database
 * @param {string} model - the Neo4j model
 * @param {uuid} uuid - the node uuid
 * @param {string|array} relation - a specific relation (IS_MEMBER_OF)
 */
const getNodeRelations = async (model, uuid, relation = '') => {

    return new Promise(async (resolve, reject) => {
        if (Array.isArray(relation))
            relation = relation.join('|')
        const rel = relation ? `r:${relation}` : 'r';
        await neo4j.cypher(`MATCH (a:${model} {uuid: '${uuid}'})-[${rel}]-(b) RETURN b, r`, {})
            .then(async res => {
                if (res.records.length) {
                    let nodes = [], relations = []
                    for (const record of res.records) {
                        nodes.push(record.get(0))
                        relations.push(record.get(1))
                    }
                    resolve({ nodes, relations })
                } else
                    resolve([])
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getNodeRelations }
