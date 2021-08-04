/**
 * Find and add other translations if exists
 *
 * @param transElement
 * @return {array}
 */
const findTranslations = (transElement) => {
    let translations = []
    if (typeof transElement !== 'undefined' && transElement.length > 1) {
        for (const trans in transElement) {
            translations[trans.lang] = {
                title: trans.title,
                description: trans.description
            }
        }
    }
    return translations
}

module.exports = { findTranslations }
