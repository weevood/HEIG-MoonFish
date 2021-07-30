const neo4j = require.main.require('./config/neode')

/**
 * Check if a relation exist between entities
 * @param {Object} a - the first entity{ model: 'A', uuid: uuid }
 * @param {Object} b - the second entity{ model: 'B', uuid: uuid }
 * @param {Object} properties - the relation properties
 */
const relExists = (a = {}, b = {}, properties = {}) => {

    if (typeof a.uuid === 'undefined') {
        a.uuid = a.get('uuid')
        a.model = a.model().name()
    }

    if (typeof b.uuid === 'undefined') {
        b.uuid = b.get('uuid')
        b.model = b.model().name()
    }

    return new Promise((resolve, reject) => {
        neo4j.cypher(
            `RETURN EXISTS( (:${a.model} {uuid: $aUuid})-[:IS_MEMBER_OF]-(:${b.model} {uuid: $bUuid}) ) as count`,
            {
                aUuid: a.uuid,
                bUuid: b.uuid
            }
        )
            .then(res => {
                if (properties) {
                    // TODO check properties
                }
                resolve(res.records.length && res.records[0].get('count'));
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { relExists }
