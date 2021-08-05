const uuid = require('uuid')
const mariadb = require('../../models/mariadb')
const Project = mariadb.models.Project
const Trans = mariadb.models.ProjectTranslation
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { createNode } = require('../../middleware/db/createNode')
const { findTeamNode } = require('../teams/helpers')
const { PROJECT_STATUS_PLANNING } = require('../../models/enums/projectStatus')
const { setProjectInfo } = require('./helpers')
const { createItem } = require('../../middleware/db')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await findTeamNode(data.teamUuid)

        // Create project and translations
        const project = await createItem(Project, {
            ...data,
            uuid: uuid.v4(),
        })
        project['projects_translations'] = []
        project['projects_translations'].push(await createItem(Trans, {
            ...data,
            projectId: project.id
        }))

        // Create project node
        const projectNode = await createNode('Project', {
            ...data,
            uuid: project.uuid,
            status: PROJECT_STATUS_PLANNING,
            deadline: new Date(data.deadline)
        })
        await team.relateTo(projectNode, 'mandates')
        res.status(201).json(await setProjectInfo(project, projectNode))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createProject }
