const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { updateNode } = require('../../middleware/db')
const { requiredRole } = require('../auth')
const { ROLE_ADMIN } = require('../../models/enums/roles')
const { STATUS_INACTIVE, STATUS_ACTIVE, STATUS_BANNED } = require('../../models/enums/status')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTeamStatus = async (req, res) => {
    try {
        const data = matchedData(req)
        let statusId = 0
        switch (data.status) {
            case 'inactive':
                statusId = STATUS_INACTIVE
                break
            case 'active':
                statusId = STATUS_ACTIVE
                break
            case 'banned':
                requiredRole(ROLE_ADMIN)
                statusId = STATUS_BANNED
                break
        }
        if (statusId) {
            await updateNode('Team', data.uuid, { status: statusId })
            res.status(200).json(buildSuccObject('TEAM_STATUS_SET_TO_' + data.status.toUpperCase()))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateTeamStatus }
