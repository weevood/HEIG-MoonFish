const { handleError } = require('../../middleware/utils')
const {
    findProjectsRecosByApplies,
    findProjectsRecosByMandates,
    findProjectsRecosByTags
} = require('./helpers')
const { getEnumValues } = require('../../models/enums/getEnumValues')
const { findUserByUuid } = require('../users/helpers')
const {
    NB_OF_TAGS_FOR_100_PERCENT,
    NB_OF_APPLIES_FOR_100_PERCENT,
    MIN_PROJECT_MARK,
    MAX_PROJECT_MARK
} = require('../../../config/constants')
const NB_OF_RECOMMENDATIONS = getEnumValues(require('../../models/enums/recommendations')).length

/**
 * Get projects recommendations by tags similarities when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectsRecommendations = async (req, res) => {
    try {
        let recommendedProjects = {}
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const user = await findUserByUuid(req.user.uuid)
        const percentage = (100 / NB_OF_RECOMMENDATIONS)

        await findProjectsRecosByApplies(user.uuid, limit).then((projects) => {
            for (const project of projects) {
                if (project.nbOfApplies >= 1) {
                    const recommendedAt = percentage * ((project.nbOfApplies >= NB_OF_APPLIES_FOR_100_PERCENT ?
                        NB_OF_APPLIES_FOR_100_PERCENT : project.nbOfApplies) / NB_OF_APPLIES_FOR_100_PERCENT)
                    if (recommendedProjects[project.uuid] === undefined) {
                        delete project.nbOfApplies
                        recommendedProjects[project.uuid] = { recommendedAt, ...project }
                    } else
                        recommendedProjects[project.uuid].recommendedAt += recommendedAt
                }
            }
        })

        await findProjectsRecosByMandates(user.uuid, limit).then((projects) => {
            for (const project of projects) {
                if (project.markOnOtherProjects >= MIN_PROJECT_MARK) {
                    const recommendedAt = percentage * ((project.markOnOtherProjects >= MAX_PROJECT_MARK ?
                        MAX_PROJECT_MARK : project.markOnOtherProjects) / MAX_PROJECT_MARK)
                    if (recommendedProjects[project.uuid] === undefined) {
                        delete project.markOnOtherProjects
                        recommendedProjects[project.uuid] = { recommendedAt, ...project }
                    } else
                        recommendedProjects[project.uuid].recommendedAt += recommendedAt
                }
            }
        })

        await findProjectsRecosByTags(user.uuid, limit).then((projects) => {
            for (const project of projects) {
                if (project.nbOfMatchingTags >= 1) {
                    const recommendedAt = percentage * ((project.nbOfMatchingTags >= NB_OF_TAGS_FOR_100_PERCENT ?
                        NB_OF_TAGS_FOR_100_PERCENT : project.nbOfMatchingTags) / NB_OF_TAGS_FOR_100_PERCENT)
                    if (recommendedProjects[project.uuid] === undefined) {
                        delete project.nbOfMatchingTags
                        recommendedProjects[project.uuid] = { recommendedAt, ...project }
                    } else
                        recommendedProjects[project.uuid].recommendedAt += recommendedAt
                }
            }
        })

        recommendedProjects = Object.values(recommendedProjects)
        recommendedProjects.sort((a, b) => (a.recommendedAt > b.recommendedAt) ? -1 : 1)
        res.status(200).json(recommendedProjects.slice(0, limit))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectsRecommendations }
