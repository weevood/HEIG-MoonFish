const neo4j = require('../../../../config/neode')
const { clearNode } = require('../../../middleware/utils')
const { setProjectInfo, findProject } = require('../../projects/helpers')
const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { PROJECT_STATUS_ENDED, PROJECT_STATUS_PROPOSAL } = require('../../../models/enums/projectStatus')
const {
    RECO_PROJECT_APPLIES,
    RECO_PROJECT_MANDATES,
    RECO_PROJECT_TAGS
} = require('../../../models/enums/recommendations')

/**
 * Find user by ID
 * @param {uuid} uuid - the node uuid
 * @param {int} recommendation - the type of the recommendation
 * @param {int} limit - the maximum number of recommendations to retrieve
 */
const findProjectsRecommendations = (uuid, recommendation, limit = 10) => {

    return new Promise(async (resolve, reject) => {
        let query, params
        switch (recommendation) {

            case RECO_PROJECT_APPLIES:
                query = `MATCH (a:${model} {uuid: '${uuid}'})-[${rel}]-(b) RETURN b, r`
                params = {}
                break;

            case RECO_PROJECT_MANDATES:
                query = `MATCH (a:${model} {uuid: '${uuid}'})-[${rel}]-(b) RETURN b, r`
                params = {}
                break;

            case RECO_PROJECT_TAGS:
                const REF_PROJECTS_LIMIT = 3
                query = `MATCH (u:User {uuid: '${uuid}'})-[rmo:IS_MEMBER_OF {status: ${STATUS_ACTIVE}}]
                            ->(t:Team)-[rd:DEVELOPS]->(p:Project)<-[rm:MANDATES]-(m:Team)
                        WHERE p.status = ${PROJECT_STATUS_ENDED}
                        WITH p
                        ORDER BY rm.mark DESC
                        LIMIT ${REF_PROJECTS_LIMIT}
                        WITH COLLECT(apoc.convert.fromJsonList(p.tags)) AS tags
                        WITH REDUCE(output = [], t IN tags | output + t) AS flatTags
                        MATCH (recs:Project)
                        WHERE recs.status = ${PROJECT_STATUS_PROPOSAL} 
                            AND any(t IN apoc.convert.fromJsonList(recs.tags) WHERE t IN flatTags)
                        RETURN recs, flatTags AS Recommendations
                        LIMIT ${limit}`
                params = {}
                break;
        }
        await neo4j.cypher(query, params)
            .then(async res => {
                if (res.records.length) {
                    let projects = []
                    for (const record of res.records) {
                        try {
                            const projectNode = await clearNode(record.get(0))
                            const project = await findProject(projectNode.uuid)
                            projects.push(await setProjectInfo(project, projectNode))
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    if (recommendation === RECO_PROJECT_TAGS) {
                        // Sort projects by number of matching tags
                        const flatTags = res.records[0].get(1)
                        projects.forEach(project => {
                            project.nbOfMatchingTags = project.tags.filter(tag => flatTags.includes(tag)).length
                        })
                        projects.sort((a, b) => (a.nbOfMatchingTags > b.nbOfMatchingTags) ? -1 : 1)
                    }
                    resolve({ projects })
                } else
                    resolve([])
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findProjectsRecommendations }
