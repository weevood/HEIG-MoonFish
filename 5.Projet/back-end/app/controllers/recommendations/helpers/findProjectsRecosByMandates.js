const neo4j = require('../../../../config/neode')
const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { clearNode } = require('../../../middleware/utils')
const { setProjectInfo, findProject } = require('../../projects/helpers')
const {
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_PROPOSAL,
    PROJECT_STATUS_ONGOING
} = require('../../../models/enums/projectStatus')

/**
 * Find projects recommendations by madates
 *
 * @param {uuid} uuid - the node uuid
 * @param {int} limit - the maximum number of recommendations to retrieve
 */
const findProjectsRecosByMandates = (uuid, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        const query = `MATCH (u:User {uuid: '${uuid}'})-[rmo:IS_MEMBER_OF {status: ${STATUS_ACTIVE}}]
                            ->(t:Team)-[rd:DEVELOPS]->(p:Project)<-[rm:MANDATES]-(m:Team)-[rm2:MANDATES]->(recs:Project)
                        WHERE p.status IN [${PROJECT_STATUS_ONGOING}, ${PROJECT_STATUS_ENDED}]
                            AND p <> recs
                            AND recs.status = ${PROJECT_STATUS_PROPOSAL} 
                        RETURN recs AS recommendations, rm
                        LIMIT ${limit}`
        await neo4j.cypher(query, {})
            .then(async res => {
                let projects = []
                if (res.records.length) {
                    for (const record of res.records) {
                        try {
                            const relation = res.records[0].get('rm')
                            const projectNode = await clearNode(record.get('recommendations'))
                            const project = await findProject(projectNode.uuid)
                            const projectInfo = await setProjectInfo(project, projectNode)
                            projects.push({
                                ...projectInfo,
                                markOnOtherProjects: (relation.properties.mark ? relation.properties.mark : (5 / 2))
                            })
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    // Sort projects by obtained mark
                    projects.sort((a, b) => (a.markOnOtherProjects > b.markOnOtherProjects) ? -1 : 1)

                }
                resolve(projects)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findProjectsRecosByMandates }
