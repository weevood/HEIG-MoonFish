const i18n = require('i18n')
const { beforeSendEmail } = require('./beforeSendEmail')

/**
 * Sends reset password email
 *
 * @param {string} locale - locale
 * @param {Object} userData - userData object
 */
const sendResetPasswordEmail = (locale = '', userData = {}) => {
    i18n.setLocale(locale)
    const subject = i18n.__('forgotPassword.SUBJECT')
    const htmlMessage = i18n.__(
        'forgotPassword.MESSAGE',
        userData.email,
        process.env.FRONTEND_URL,
        userData.verification
    )
    beforeSendEmail(userData, subject, htmlMessage)
}

module.exports = { sendResetPasswordEmail }
