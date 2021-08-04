const { validateCreateTeam } = require('./validateCreateTeam')
const { validateDeleteTeam } = require('./validateDeleteTeam')
const { validateGetTeam } = require('./validateGetTeam')
const { validateJoinTeam } = require('./validateJoinTeam')
const { validateLeaveTeam } = require('./validateLeaveTeam')
const { validateUpdateTeam } = require('./validateUpdateTeam')
const { validateUpdateTeamStatus } = require('./validateUpdateTeamStatus')

module.exports = {
    validateCreateTeam,
    validateDeleteTeam,
    validateGetTeam,
    validateJoinTeam,
    validateLeaveTeam,
    validateUpdateTeam,
    validateUpdateTeamStatus,
}
