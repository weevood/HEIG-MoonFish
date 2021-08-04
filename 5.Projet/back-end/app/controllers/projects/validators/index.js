const { validateApplyProject } = require('./validateApplyProject')
const { validateArbitrateProject } = require('./validateArbitrateProject')
const { validateCreateProject } = require('./validateCreateProject')
const { validateDeleteProject } = require('./validateDeleteProject')
const { validateDevelopProject } = require('./validateDevelopProject')
const { validateFeedbackProject } = require('./validateFeedbackProject')
const { validateGetProject } = require('./validateGetProject')
const { validateUpdateProject } = require('./validateUpdateProject')
const { validateUpdateProjectStatus } = require('./validateUpdateProjectStatus')

module.exports = {
    validateApplyProject,
    validateArbitrateProject,
    validateCreateProject,
    validateDeleteProject,
    validateDevelopProject,
    validateFeedbackProject,
    validateGetProject,
    validateUpdateProject,
    validateUpdateProjectStatus,
}
