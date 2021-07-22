const { emailExists } = require('./emailExists')
const { beforeSendEmail } = require('./beforeSendEmail')
const { sendEmail } = require('./sendEmail')
const { sendRegistrationEmail } = require('./sendRegistrationEmail')
const { sendResetPasswordEmail } = require('./sendResetPasswordEmail')

module.exports = {
    emailExists,
    beforeSendEmail,
    sendEmail,
    sendRegistrationEmail,
    sendResetPasswordEmail
}
