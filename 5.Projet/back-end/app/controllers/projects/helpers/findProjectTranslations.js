/**
 * Find and add other translations if exists
 *
 * @param transElement the element to translate
 * @return {array}
 */
const findProjectTranslations = (transElement) => {
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

module.exports = { findProjectTranslations }
