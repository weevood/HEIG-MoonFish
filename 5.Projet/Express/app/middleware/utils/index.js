const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { getBrowserInfo } = require('./getBrowserInfo')
const { getCountry } = require('./getCountry')
const { getIP } = require('./getIP')
const { handleError } = require('./handleError')
const { itemNotFound } = require('./itemNotFound')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { validateResult } = require('./validateResult')

module.exports = {
    buildErrObject,
    buildSuccObject,
    getBrowserInfo,
    getCountry,
    getIP,
    handleError,
    itemNotFound,
    removeExtensionFromFile,
    validateResult
}
