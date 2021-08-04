const { relExists } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findUserNode } = require("../users/helpers")
const { findTeamNode } = require('./helpers')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')
const { STATUS_ACTIVE } = require("../../models/enums/status");

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const leaveTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserNode(req.user.uuid)
        const team = await findTeamNode(data.uuid, [STATUS_ACTIVE])
        if (await relExists(user, RELATION_IS_MEMBER_OF, team)) {
            await user.detachFrom(team)
            res.status(200).json(buildSuccObject('TEAM_LEAVED'))
        }
        res.status(403).json({ error: { msg: 'USER_NOT_IN_TEAM' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { leaveTeam }
