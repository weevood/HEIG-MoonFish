const neo4j = require('../../../../config/neode')
const { PROJECT_STATUS_ENDED, PROJECT_STATUS_PROPOSAL } = require('../../../models/enums/projectStatus')
const { REF_PROJECTS_LIMIT } = require('../../../../config/constants')
const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { clearNode } = require('../../../middleware/utils')
const { setProjectInfo, findProject } = require('../../projects/helpers')

/**
 * Find recommended projects by tags similarities
 *
 * @param {uuid} uuid - the main project uuid
 * @param {int} limit - the maximum number of recommendations to retrieve
 */
const findProjectsRecosByTags = (uuid, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        const query = `MATCH (u:User {uuid: '${uuid}'})-[rmo:IS_MEMBER_OF {status: ${STATUS_ACTIVE}}]
                            ->(t:Team)-[rd:DEVELOPS]->(p:Project)<-[rm:MANDATES]-(m:Team)
                        WHERE p.status = ${PROJECT_STATUS_ENDED}
                        WITH p
                        ORDER BY rm.mark DESC
                        LIMIT ${REF_PROJECTS_LIMIT}
                        WITH COLLECT(p.tags) AS tags
                        WITH REDUCE(output = [], t IN tags | output + t) AS flatTags
                        MATCH (recs:Project)
                        WHERE recs.status = ${PROJECT_STATUS_PROPOSAL}
                            AND any(t IN recs.tags WHERE t IN flatTags)
                        RETURN recs AS recommendations, flatTags
                        LIMIT ${limit}`
        await neo4j.cypher(query, {})
            .then(async res => {
                let projects = []
                if (res.records.length) {
                    const flatTags = res.records[0].get('flatTags')
                    for (const record of res.records) {
                        try {
                            const projectNode = await clearNode(record.get('recommendations'))
                            const project = await findProject(projectNode.uuid)
                            const projectInfo = await setProjectInfo(project, projectNode)
                            projects.push({
                                ...projectInfo,
                                nbOfMatchingTags: projectInfo.tags.filter(tag => flatTags.includes(tag)).length
                            })
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    // Sort projects by number of matching tags
                    projects.sort((a, b) => (a.nbOfMatchingTags > b.nbOfMatchingTags) ? -1 : 1)

                }
                resolve(projects)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findProjectsRecosByTags }
