const mariadb = require('../../../models/mariadb')
const Project = mariadb.models.Project
const ProjectTranslation = mariadb.models.ProjectTranslation
const { buildErrObject } = require('../../../middleware/utils')
const { getItemByUuid } = require('../../../middleware/db')

/**
 * Find project by uuid
 *
 * @param {uuid} uuid - the project´s uuid
 * @param {string} lang - the translation to load
 */
const findProject = (uuid, lang = 'en') => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItemByUuid(Project, uuid, {
                include: [{
                    model: ProjectTranslation,
                    where: { lang }
                }]
            }))
        } catch (error) {
            reject(buildErrObject(404, 'PROJECT_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findProject }
