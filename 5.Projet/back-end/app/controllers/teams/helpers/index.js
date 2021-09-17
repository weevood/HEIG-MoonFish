const { teamExists } = require('./teamExists')
const { findTeamNode } = require('./findTeamNode')
const { findTeamOwner } = require('./findTeamOwner')
const { findTeamsNodes } = require('./findTeamsNodes')
const { findUserTeams } = require('./findUserTeams')
const { updateGrade } = require('./updateGrade')
const { updateMandates } = require('./updateMandates')
const { updateDevelops } = require('./updateDevelops')

module.exports = {
  teamExists,
  findTeamNode,
  findTeamOwner,
  findTeamsNodes,
  findUserTeams,
  updateGrade,
  updateMandates,
  updateDevelops,
}
