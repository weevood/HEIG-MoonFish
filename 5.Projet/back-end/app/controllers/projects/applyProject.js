const { getNode, relExists } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findUserNode } = require('../users/helpers');

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const applyProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserNode(req.user.uuid)
        const project = await getNode('Project', data.uuid)
        if (!await relExists(user, project)) {
            await user.relateTo(project, 'isMemberOf', { isOwner: false });
            res.status(200).json(buildSuccObject('TEAM_JOINED'))
        }
        res.status(403).json({ error: { msg: 'USER_ALREADY_IN_TEAM' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { applyProject }
