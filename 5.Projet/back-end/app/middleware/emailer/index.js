const { beforeSendEmail } = require('./beforeSendEmail')
const { emailExists } = require('./emailExists')
const { sendEmail } = require('./sendEmail')
const { sendRegistrationEmail } = require('./sendRegistrationEmail')
const { sendResetPasswordEmail } = require('./sendResetPasswordEmail')

module.exports = {
    beforeSendEmail,
    emailExists,
    sendEmail,
    sendRegistrationEmail,
    sendResetPasswordEmail
}
