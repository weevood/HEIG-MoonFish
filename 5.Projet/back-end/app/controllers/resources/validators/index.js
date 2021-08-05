const { validateCreateResource } = require('./validateCreateResource')
const { validateDeleteResource } = require('./validateDeleteResource')
const { validateGetResource } = require('./validateGetResource')
const { validateUpdateResource } = require('./validateUpdateResource')

module.exports = {
    validateCreateResource,
    validateDeleteResource,
    validateGetResource,
    validateUpdateResource,
}
