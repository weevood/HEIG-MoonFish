const passport = require('passport')
const auth = require('../app/middleware/auth')
const { findUserByUuid } = require("../app/controllers/auth/helpers");
const JwtStrategy = require('passport-jwt').Strategy

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string|null} token - decrypted token
 */
const jwtExtractor = (req) => {
    let token = null
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '').trim()
    } else if (req.body.token) {
        token = req.body.token.trim()
    } else if (req.query.token) {
        token = req.query.token.trim()
    }
    // Decrypts token
    if (token) {
        token = auth.decrypt(token)
    }
    return token
}

/**
 * Options object for jwt middleware
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
            return !user ? done(null, false) : done(null, user)
        })
        .catch(error => {
            return done(error, false)
        })
})

passport.use(jwtLogin)
