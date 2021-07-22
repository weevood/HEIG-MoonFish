const i18n = require('i18n')
const { beforeSendEmail } = require('./beforeSendEmail')

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} userData - userData object
 */
const sendRegistrationEmail = (locale = '', userData = {}) => {
    i18n.setLocale(locale)
    const subject = i18n.__('registration.SUBJECT')
    const htmlMessage = i18n.__(
        'registration.MESSAGE',
        userData.firstname,
        process.env.FRONTEND_URL,
        userData.verification
    )
    beforeSendEmail(userData, subject, htmlMessage)
}

module.exports = { sendRegistrationEmail }
