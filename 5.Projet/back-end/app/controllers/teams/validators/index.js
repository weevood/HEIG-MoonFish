const { validateCreateTeam } = require('./validateCreateTeam')
const { validateDeleteTeam } = require('./validateDeleteTeam')
const { validateGetTeam } = require('./validateGetTeam')
const { validateJoinLeaveTeam } = require('./validateJoinLeaveTeam')
const { validateTeamUserRelation } = require('./validateTeamUserRelation')
const { validateUpdateTeam } = require('./validateUpdateTeam')
const { validateUpdateTeamStatus } = require('./validateUpdateTeamStatus')

module.exports = {
    validateCreateTeam,
    validateDeleteTeam,
    validateGetTeam,
    validateJoinLeaveTeam,
    validateTeamUserRelation,
    validateUpdateTeam,
    validateUpdateTeamStatus
}
