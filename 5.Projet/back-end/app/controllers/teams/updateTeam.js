const { updateNode, relExists } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        if (await relExists(
            { model: 'User', uuid: req.user.uuid },
            RELATION_IS_MEMBER_OF,
            { model: 'Team', uuid: data.uuid },
            { isOwner: true })
        ) {
            res.status(200).json(await updateNode('Team', data.uuid, data))
        } else
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateTeam }