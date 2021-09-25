const { RELATION_DEVELOPS, RELATION_MANDATES } = require('../../../models/enums/relations')
const { buildErrObject } = require('../../../middleware/utils')
const { updateNode, getNodeRelations } = require('../../../middleware/db')

/**
 * Calculate and update a team grade
 *
 * @param {Object} team - the team to update grade
 * @param {number} mark - a mark to add
 */
const updateGrade = (team, mark = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            await getNodeRelations('Team', team.uuid, RELATION_DEVELOPS)
                .then(async ({ nodes, relations }) => {
                    let grade = 0.0, finishedProject = 0
                    if (relations && team.grade && mark) {
                        // Team as already a grade
                        for (const [i, relation] of relations.entries()) {
                            if (relation.properties.endDate)
                                finishedProject++
                        }
                        grade = ((team.grade * finishedProject + mark) / (finishedProject + 1))
                    } else if (nodes) {
                        // Team as not grade for now
                        let marks = grade
                        for (const [i, project] of nodes.entries()) {
                            await getNodeRelations('Project', project.properties.uuid, RELATION_MANDATES)
                                .then(async ({ nodes, relations }) => {
                                    if (relations[0].properties.endDate) {
                                        marks += relations[0].properties.mark
                                        finishedProject++
                                    }
                                })
                        }
                        if (finishedProject > 0)
                            grade = (Math.round((marks / finishedProject) * 1e3) / 1e3) // 3 digits
                    }
                    resolve(await updateNode('Team', team.uuid, { grade }))
                })
        } catch (error) {
            reject(buildErrObject(422, 'CANNOT_UPDATE_TEAM_GRADE'))
        }
    })
}

module.exports = { updateGrade }
