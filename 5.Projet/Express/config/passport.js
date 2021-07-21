const passport = require('passport')
const sequelize = require.main.require('./config/sequelize')
const User = require.main.require('./app/models/user')(sequelize)
const auth = require('../app/middleware/auth')
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
		}
		else if (req.body.token) {
				token = req.body.token.trim()
		}
		else if (req.query.token) {
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
		User.findById(payload.data._id, (err, user) => {
				if (err) {
						return done(err, false)
				}
				return !user ? done(null, false) : done(null, user)
		})
})

passport.use(jwtLogin)
