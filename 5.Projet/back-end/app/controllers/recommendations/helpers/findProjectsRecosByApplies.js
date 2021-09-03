const neo4j = require('../../../../config/neode')
const { clearNode } = require('../../../middleware/utils')
const { setProjectInfo, findProject } = require('../../projects/helpers')
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
        const query = `MATCH (recs:Project {uuid: '${uuid}'})
                        RETURN recs AS Recommendations
                        LIMIT ${limit}`
        await neo4j.cypher(query, {})
            .then(async res => {
                let projects = []
                if (res.records.length) {
                    const flatTags = res.records[0].get(1)
                    for (const record of res.records) {
                        try {
                            const projectNode = await clearNode(record.get(0))
                            const project = await findProject(projectNode.uuid)
                            const projectInfo = await setProjectInfo(project, projectNode)
                            projects.push({
                                ...projectInfo,
                                nbOfMatchingTags: project.tags.filter(tag => flatTags.includes(tag)).length
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

module.exports = { findProjectsRecosByApplies }
