const { ROLE_ADMIN } = require('../../models/enums/roles')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { requiredRole } = require('../auth')
const { updateNode } = require('../../middleware/db')
const {
    PROJECT_STATUS_ABANDONED,
    PROJECT_STATUS_BANNED,
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_INACTIVE,
    PROJECT_STATUS_ONGOING,
    PROJECT_STATUS_PLANNING,
    PROJECT_STATUS_PROPOSAL,
    PROJECT_STATUS_VALIDATION
} = require('../../models/enums/projectStatus')

/**
 * Update project status function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProjectStatus = async (req, res) => {
    try {
        const data = matchedData(req)
        let statusId = 0
        switch (data.status) {
            case 'inactive':
                statusId = PROJECT_STATUS_INACTIVE
                break
            case 'planning':
                statusId = PROJECT_STATUS_PLANNING
                break
            case 'validation':
                statusId = PROJECT_STATUS_VALIDATION
                break
            case 'proposal':
                statusId = PROJECT_STATUS_PROPOSAL
                break
            case 'ongoing':
                statusId = PROJECT_STATUS_ONGOING
                break
            case 'ended':
                statusId = PROJECT_STATUS_ENDED
                break
            case 'abandoned':
                statusId = PROJECT_STATUS_ABANDONED
                break
            case 'banned':
                requiredRole(ROLE_ADMIN)
                statusId = PROJECT_STATUS_BANNED
                break
        }
        if (statusId) {
            await updateNode('Project', data.uuid, { status: statusId })
            res.status(200).json(buildSuccObject('PROJECT_STATUS_SET_TO_' + data.status.toUpperCase()))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProjectStatus }
