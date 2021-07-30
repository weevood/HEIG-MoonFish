const { validateApplyProject } = require('./validateApplyProject')
const { validateArbitrateProject } = require('./validateArbitrateProject')
const { validateCreateProject } = require('./validateCreateProject')
const { validateDeleteProject } = require('./validateDeleteProject')
const { validateDevelopProject } = require('./validateDevelopProject')
const { validateGetProject } = require('./validateGetProject')
const { validateUpdateProject } = require('./validateUpdateProject')

module.exports = {
    validateApplyProject,
    validateArbitrateProject,
    validateCreateProject,
    validateDeleteProject,
    validateDevelopProject,
    validateGetProject,
    validateUpdateProject
}
