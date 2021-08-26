const { relExists, updateRelation } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findUserNode } = require('../users/helpers')
const { findTeamNode } = require('./helpers')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')
const { STATUS_ACTIVE, STATUS_BANNED } = require('../../models/enums/status')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTeamUserRelation = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserNode(req.user.uuid)
        const member = await findUserNode(data.userUuid)
        const team = await findTeamNode(data.teamUuid, [STATUS_ACTIVE])
        if (await relExists(user, RELATION_IS_MEMBER_OF, team, { isOwner: true })) {
            if (await relExists(member, RELATION_IS_MEMBER_OF, team)) {
                switch (data.action) {
                    case 'accept':
                        await updateRelation(member, RELATION_IS_MEMBER_OF, team, { status: STATUS_ACTIVE })
                        res.status(200).json(buildSuccObject('USER_ACCEPTED'))
                        break;
                    case 'ban':
                        await updateRelation(member, RELATION_IS_MEMBER_OF, team, { status: STATUS_BANNED })
                        res.status(200).json(buildSuccObject('USER_BANNED'))
                        break;
                    case 'giveOwnership':
                        await updateRelation(member, RELATION_IS_MEMBER_OF, team, { isOwner: true })
                        await updateRelation(user, RELATION_IS_MEMBER_OF, team, { isOwner: false })
                        res.status(200).json(buildSuccObject('OWNERSHIP_TRANSMITTED'))
                        break;
                }
            }
            res.status(403).json({ error: { msg: 'USER_NOT_IN_TEAM' } })
        }
        res.status(403).json({ error: { msg: 'USER_NOT_OWNER' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateTeamUserRelation }
