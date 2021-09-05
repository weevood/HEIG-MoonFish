const neo4j = require('../../../../config/neode')
const { clearNode } = require('../../../middleware/utils')
const { setProjectInfo, findProject } = require('../../projects/helpers')
const { getNodeRelations } = require('../../../middleware/db')
const { RELATION_MANDATES } = require('../../../models/enums/relations')
const { STATUS_ACTIVE } = require('../../../models/enums/status')
const {
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_PROPOSAL,
    PROJECT_STATUS_ONGOING
} = require('../../../models/enums/projectStatus')

/**
 * Find user by ID
 * @param {uuid} uuid - the node uuid
 * @param {int} limit - the maximum number of recommendations to retrieve
 */
const findProjectsRecosByApplies = (uuid, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        const query = `MATCH (u:User {uuid: '${uuid}'})-[rmo:IS_MEMBER_OF {status: ${STATUS_ACTIVE}}]
                            ->(t:Team)-[rd:DEVELOPS]->(p:Project)<-[ra:APPLIES]-(a:Team)-[ra2:APPLIES]->(recs:Project)
                        WHERE p.status IN [${PROJECT_STATUS_ONGOING}, ${PROJECT_STATUS_ENDED}]
                            AND t <> a
                            AND p <> recs
                            AND recs.status = ${PROJECT_STATUS_PROPOSAL} 
                        RETURN recs AS recommendations
                        LIMIT ${limit}`
        await neo4j.cypher(query, {})
            .then(async res => {
                let projects = []
                if (res.records.length) {
                    for (const record of res.records) {
                        try {
                            const projectNode = await clearNode(record.get('recommendations'))
                            const project = await findProject(projectNode.uuid)
                            const projectInfo = await setProjectInfo(project, projectNode)
                            await getNodeRelations('Project', project.uuid, RELATION_MANDATES)
                                .then(async ({ nodes, relations }) => {
                                    projects.push({
                                        ...projectInfo,
                                        nbOfApplies: relations.length
                                    })
                                })
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    // Sort projects by number of applies
                    projects.sort((a, b) => (a.nbOfApplies > b.nbOfApplies) ? -1 : 1)
                }
                resolve(projects)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findProjectsRecosByApplies }
