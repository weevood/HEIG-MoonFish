const { sendEmail } = require('./sendEmail')

/**
 * Prepares to send email
 *
 * @param {Object} userData - userData object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const beforeSendEmail = (userData = {}, subject = '', htmlMessage = '') => {
    const data = {
        user: userData,
        subject,
        htmlMessage
    }
    if (process.env.NODE_ENV === 'production') {
        sendEmail(data).then((messageSent) => messageSent
            ? console.log(`Email SENT to: ${userData.email}`)
            : console.log(`Email FAILED to: ${userData.email}`))
    } else if (process.env.NODE_ENV === 'development') {
        console.log(data)
    }
}

module.exports = { beforeSendEmail }
