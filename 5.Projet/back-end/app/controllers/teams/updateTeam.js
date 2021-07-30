const { updateNode, relExists, getNode } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await getNode('Team', data.uuid)
        if (await relExists(
            { model: 'Team', uuid: data.uuid },
            { model: 'User', uuid: req.user.uuid },
            { isOwner: true })
        ) {
            res.status(200).json(await updateNode('Team', data.uuid, data))
        }else
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateTeam }
