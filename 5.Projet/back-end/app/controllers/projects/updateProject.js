const mariadb = require('../../models/mariadb')
const Project = mariadb.models.Project
const Trans = mariadb.models.ProjectTranslation
const { RELATION_MANDATES } = require('../../models/enums/relations')
const { findProject } = require('./helpers')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateNode, relExists, updateItem } = require('../../middleware/db')

/**
 * Update item function called by route
 *
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
            { model: 'Project', uuid: data.uuid },
            { isOwner: true })
        ) {
            await updateItem(Project, project.id, data)
            await updateItem(Trans, { projectId: project.id }, data)
            let nodeValues = {}
            if (data.deadline)
                nodeValues.deadline = new Date(data.deadline)
            if (data.deadline)
                nodeValues.tags = data.tags
            if (Object.keys(nodeValues).length)
                await updateNode('Project', data.uuid, nodeValues)
            res.status(200).json(buildSuccObject('PROJECT_UPDATED'))
        } else
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProject }
