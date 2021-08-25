const { createTeam } = require('./createTeam')
const { deleteTeam } = require('./deleteTeam')
const { getTeam } = require('./getTeam')
const { getTeamMembers } = require('./getTeamMembers')
const { getTeamProjects } = require('./getTeamProjects')
const { getTeams } = require('./getTeams')
const { joinTeam } = require('./joinTeam')
const { leaveTeam } = require('./leaveTeam')
const { updateTeam } = require('./updateTeam')
const { updateTeamStatus } = require('./updateTeamStatus')

module.exports = {
    createTeam,
    deleteTeam,
    getTeam,
    getTeamMembers,
    getTeamProjects,
    getTeams,
    joinTeam,
    leaveTeam,
    updateTeam,
    updateTeamStatus,
}
