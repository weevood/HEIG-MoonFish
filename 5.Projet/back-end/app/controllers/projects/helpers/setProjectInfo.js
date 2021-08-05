const { findTranslations } = require('../../translations/helpers')
const { clearNode } = require('../../../middleware/utils')
const { getEnumName } = require('../../../models/enums/getEnumName')
const projectStatus = require('../../../models/enums/projectStatus')

/**
 * Creates an object with project info
 * @param {Object} req - request object
 * @param {Object} reqNode - request Node object
 */
const setProjectInfo = (req = {}, reqNode = {}) => {
    return new Promise(async (resolve) => {
        reqNode = await clearNode(reqNode)
        let project = {
            uuid: req.uuid,
            status: getEnumName(projectStatus, reqNode.status),
            deadline: reqNode.deadline,
            tags: reqNode.tags.split(';')
        }
        if (typeof req['projects_translations'] !== 'undefined') {
            project = {
                ...project,
                title: req['projects_translations'][0].title,
                description: req['projects_translations'][0].description,
                translations: findTranslations(req['projects_translations'])
            }
        }
        // Adds verification for testing purposes
        if (process.env.NODE_ENV !== 'production') {
            project = {
                id: req.id,
                uuid: req.uuid,
                ...project
            }
        }
        resolve(project)
    })
}

module.exports = { setProjectInfo }
