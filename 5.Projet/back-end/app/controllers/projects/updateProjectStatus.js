const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { updateNode } = require('../../middleware/db')
const { requiredRole } = require('../auth')
const { ROLE_ADMIN } = require('../../models/enums/roles')
const {
    PROJECT_STATUS_INACTIVE,
    PROJECT_STATUS_PLANNING,
    PROJECT_STATUS_VALIDATION,
    PROJECT_STATUS_PROPOSAL,
    PROJECT_STATUS_ONGOING,
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_ABANDONED,
    PROJECT_STATUS_BANNED,
} = require('../../models/enums/projectStatus')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProjectStatus = async (req, res) => {
    try {
        const data = matchedData(req)
        let statusId = 0
        let setEndDate = false
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
                setEndDate = true
                break
            case 'abandoned':
                statusId = PROJECT_STATUS_ABANDONED
                setEndDate = true
                break
            case 'banned':
                requiredRole(ROLE_ADMIN)
                statusId = PROJECT_STATUS_BANNED
                break
        }
        if (setEndDate) {
            // TODO set RELATION_DEVELOPS endDate
            // TODO set RELATION_MANDATES endDate
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
