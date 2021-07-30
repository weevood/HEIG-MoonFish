const { getNode, relExists } = require('../../middleware/db')
const { handleError, buildSuccObject, buildErrObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findUserNode } = require("../users/helpers");

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const leaveTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserNode(req.user.uuid)
        const team = await getNode('Team', data.uuid)
        if (await relExists(user, team)) {
            await user.detachFrom(team);
            res.status(200).json(buildSuccObject('TEAM_LEAVED'))
        }
        res.status(403).json({ error: { msg: 'USER_NOT_IN_TEAM' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { leaveTeam }
