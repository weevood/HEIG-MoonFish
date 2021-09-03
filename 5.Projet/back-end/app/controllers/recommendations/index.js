const { getProjectsRecommendations } = require('./getProjectsRecommendations')
const { getProjectsRecosByTags } = require('./getProjectsRecosByTags')
const { getProjectsRecosByMandates } = require('./getProjectsRecosByMandates')
const { getProjectsRecosByApplies } = require('./getProjectsRecosByApplies')

module.exports = {
    getProjectsRecommendations,
    getProjectsRecosByTags,
    getProjectsRecosByMandates,
    getProjectsRecosByApplies,
}
