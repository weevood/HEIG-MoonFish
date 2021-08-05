const mariadb = require('../../models/mariadb')
const Project = mariadb.models.Project
const Trans = mariadb.models.ProjectTranslation
const { updateNode, relExists, updateItem } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findProject } = require('./helpers')
const { RELATION_MANDATES } = require('../../models/enums/relations')
const { PROJECT_STATUS_PLANNING } = require("../../models/enums/projectStatus")

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await findProject(data.uuid)
        if (await relExists(
            { model: 'Team', uuid: data.teamUuid },
            RELATION_MANDATES,
            { model: 'Project', uuid: data.uuid })
        ) {
            await updateItem(Project, project.id, data)
            await updateItem(Trans, { projectId: project.id }, data)
            await updateNode('Project', data.uuid, {
                deadline: new Date(data.deadline),
                tags: data.tags,
            })
            res.status(200).json(buildSuccObject('PROJECT_UPDATED'))
        } else
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProject }
