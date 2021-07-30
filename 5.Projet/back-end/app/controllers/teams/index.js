const { createTeam } = require('./createTeam')
const { deleteTeam } = require('./deleteTeam')
const { getTeam } = require('./getTeam')
const { getTeams } = require('./getTeams')
const { joinTeam } = require('./joinTeam')
const { leaveTeam } = require('./leaveTeam')
const { updateTeam } = require('./updateTeam')

module.exports = {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    joinTeam,
    leaveTeam,
    updateTeam,
}
