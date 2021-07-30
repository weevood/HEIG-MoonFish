const uuid = require('uuid')
const { handleError, clearNode } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { projectExists } = require('./helpers')
const { createNode } = require('../../middleware/db/createNode');
const { STATUS_ACTIVE } = require("../../models/enums/status");
const { findUserNode } = require("../users/helpers");

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createProject = async (req, res) => {
    try {
        const data = matchedData(req)
        if (!await projectExists(data.name)) {
            const user = await findUserNode(req.user.uuid)
            const project = await createNode('Project', {
                ...data,
                uuid: uuid.v4(),
                status: STATUS_ACTIVE
            })
            await user.relateTo(project, 'isMemberOf', { isOwner: true });
            res.status(201).json(clearNode(await project.toJson()))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createProject }
