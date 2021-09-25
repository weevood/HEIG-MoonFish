const algorithm = 'aes-256-cbc'
const crypto = require('crypto')
const secret = process.env.JWT_SECRET
const iv = Buffer.alloc(16, 0) // Initialization crypto vector

// Key length is dependent on the algorithm. In this case for aes256, it is 32 bytes (256 bits).
const key = crypto.scryptSync(secret, process.env.JWT_SALT, 32)

/**
 * Encrypts text
 *
 * @param {string} text - text to encrypt
 */
const encrypt = (text = '') => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

module.exports = { encrypt }
