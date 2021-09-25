const mariadb = require('../../models/mariadb')
const Project = mariadb.models.Project
const { deleteNode, deleteItem } = require('../../middleware/db')
const { findProject } = require('./helpers')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Delete item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await findProject(data.uuid)
        await deleteItem(Project, project.id)
        await deleteNode('Project', data.uuid)
        res.status(200).json(buildSuccObject('PROJECT_DELETED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteProject }
