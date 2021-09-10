const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { decrypt } = require('../app/middleware/auth/decrypt')
const { findUserByUuid } = require('../app/controllers/users/helpers')

/**
 * Extracts token from request
 *
 * @param {Object} req - request object
 * @returns {string|null} token - decrypted token
 */
const jwtExtractor = (req) => {
    let token = null

    // Extracts token from headers, body or query
    if (req.headers.authorization)
        token = req.headers.authorization.replace('Bearer ', '').trim()
    else if (req.body.token)
        token = req.body.token.trim()
    else if (req.query.token)
        token = req.query.token.trim()

    // Decrypts token
    if (token)
        token = decrypt(token)

    return token
}

/**
 * Options object for JWT middleware
 */
const jwtOptions = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    findUserByUuid(payload.data._id)
        .then(async (user) => {
            return user ? done(null, user) : done(null, false)
        })
        .catch(error => {
            return done(error, false)
        })
})

// Intercept all protected requests
passport.use('jwt', jwtLogin)
