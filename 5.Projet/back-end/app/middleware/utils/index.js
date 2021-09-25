const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { clearNode } = require('./clearNode')
const { clearNodes } = require('./clearNodes')
const { getBrowserInfo } = require('./getBrowserInfo')
const { getCountry } = require('./getCountry')
const { getIP } = require('./getIP')
const { handleError } = require('./handleError')
const { itemNotFound } = require('./itemNotFound')
const { queryToOptions } = require('./queryToOptions')
const { queryToParams } = require('./queryToParams')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { validateResult } = require('./validateResult')

module.exports = {
    buildErrObject,
    buildSuccObject,
    clearNode,
    clearNodes,
    getBrowserInfo,
    getCountry,
    getIP,
    handleError,
    itemNotFound,
    queryToOptions,
    queryToParams,
    removeExtensionFromFile,
    validateResult
}
