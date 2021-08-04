const mariadb = require.main.require('./app/models/mariadb')
const Project = mariadb.models.Project
const ProjectTranslation = mariadb.models.ProjectTranslation
const { buildErrObject } = require('../../../middleware/utils')
const { getItems } = require('../../../middleware/db')

/**
 * Find projects from query
 * @param {Object} options - build and query options
 * @param {string} lang - the translation to load
 */
const findProjects = (options = {}, lang = 'en') => {
    return new Promise(async (resolve, reject) => {
        try {
            options.include = [{
                model: ProjectTranslation,
                where: { lang }
            }]
            resolve(await getItems(Project, options))
        } catch (error) {
            reject(buildErrObject(404, 'PROJECTS_NOT_FOUND'))
        }
    })
}

module.exports = { findProjects }
