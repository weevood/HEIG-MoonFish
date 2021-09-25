const neo4j = require('../../../config/neode')
const { buildErrObject, buildSuccObject } = require('../../middleware/utils')
const { relExists } = require('./relExists')

/**
 * Update a relation in database
 *
 * @param {Object} a - the first entity { model: 'A', uuid: uuid }
 * @param {string} relation - the relation name (IS_MEMBER_OF)
 * @param {Object} b - the second entity { model: 'B', uuid: uuid }
 * @param {Object} values - the values to update
 */
const updateRelation = (a = {}, relation = '', b = {}, values = {}) => {
    return new Promise(async (resolve, reject) => {
        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))

        if (typeof a.uuid === 'undefined') {
            a.uuid = a.get('uuid')
            a.model = a.model().name()
        }

        if (typeof b.uuid === 'undefined') {
            b.uuid = b.get('uuid')
            b.model = b.model().name()
        }

        if (await relExists(a, relation, b)) {
            let set = ''
            Object.entries(values).forEach(([key, value]) => {
                if (key.toLowerCase().includes('date'))
                    set += `r.${key} = date(datetime({epochmillis: ${value}})), `
                else
                    set += `r.${key} = ${value}, `
            })
            await neo4j.writeCypher(`
                MATCH (:${a.model} {uuid: '${a.uuid}'})-[r:${relation}]-(:${b.model} {uuid: '${b.uuid}'})
                SET ${set.replace(/,\s*$/, '')}
                RETURN r
            `)
                .then(res => {
                    if (res.records.length && res.records[0].get('r'))
                        resolve(buildSuccObject('RELATION_UPDATED'))
                })
                .catch(error => {
                    reject(error)
                })
        }
        reject(buildErrObject(422, 'RELATION_UPDATE_FAILED'))
    })
}

module.exports = { updateRelation }
