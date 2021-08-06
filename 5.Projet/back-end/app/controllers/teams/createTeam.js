const uuid = require('uuid')
const { handleError, clearNode } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { teamExists } = require('./helpers')
const { createNode } = require('../../middleware/db/createNode')
const { STATUS_ACTIVE } = require('../../models/enums/status')
const { findUserNode } = require("../users/helpers")

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        if (!await teamExists(data.name)) {
            const user = await findUserNode(req.user.uuid)
            const team = await createNode('Team', {
                ...data,
                uuid: uuid.v4(),
                status: STATUS_ACTIVE
            })
            await user.relateTo(team, 'isMemberOf', { isOwner: true })
            res.status(201).json(await clearNode(team))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createTeam }
