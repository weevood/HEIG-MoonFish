const { getProjectsRecommendations } = require('./getProjectsRecommendations')
const { getProjectsRecosByApplies } = require('./getProjectsRecosByApplies')
const { getProjectsRecosByMandates } = require('./getProjectsRecosByMandates')
const { getProjectsRecosByTags } = require('./getProjectsRecosByTags')

module.exports = {
    getProjectsRecommendations,
    getProjectsRecosByApplies,
    getProjectsRecosByMandates,
    getProjectsRecosByTags
}
