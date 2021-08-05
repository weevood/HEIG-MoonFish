const { applyProject } = require('./applyProject')
const { arbitrateProject } = require('./arbitrateProject')
const { createProject } = require('./createProject')
const { deleteProject } = require('./deleteProject')
const { developProject } = require('./developProject')
const { feedbackProject } = require('./feedbackProject')
const { getProject } = require('./getProject')
const { getProjectResources } = require('./getProjectResources')
const { getProjects } = require('./getProjects')
const { updateProject } = require('./updateProject')
const { updateProjectStatus } = require('./updateProjectStatus')

module.exports = {
    applyProject,
    arbitrateProject,
    createProject,
    deleteProject,
    developProject,
    feedbackProject,
    getProject,
    getProjectResources,
    getProjects,
    updateProject,
    updateProjectStatus,
}
