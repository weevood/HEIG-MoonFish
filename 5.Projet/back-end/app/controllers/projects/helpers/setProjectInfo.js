const { findTranslations } = require('../../translations/helpers')
const { clearNode } = require('../../../middleware/utils')
const { getEnumName } = require('../../../models/enums/getEnumName')
const projectStatus = require('../../../models/enums/projectStatus')
const { PROJECT_STATUS_ENDED, PROJECT_STATUS_BANNED } = require('../../../models/enums/projectStatus')
const { getNodeRelations } = require('../../../middleware/db')
const { RELATION_MANDATES } = require('../../../models/enums/relations')

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
            deadline: new Date(reqNode.deadline),
            tags: JSON.parse(reqNode.tags)
        }
        if (reqNode.status >= PROJECT_STATUS_ENDED && reqNode.status < PROJECT_STATUS_BANNED) {
            await getNodeRelations('Project', project.uuid, RELATION_MANDATES)
                .then(async ({ nodes, relations }) => {
                    if (relations && relations.length) {
                        project = {
                            ...project,
                            endDate: new Date(relations[0].properties.endDate),
                            mark: relations[0].properties.mark?.low,
                            feedback: relations[0].properties.feedback?.low,
                        }
                    }
                })
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
                ...project
            }
        }
        resolve(project)
    })
}

module.exports = { setProjectInfo }
