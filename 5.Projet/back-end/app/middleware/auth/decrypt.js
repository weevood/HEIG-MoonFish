const algorithm = 'aes-256-cbc'
const crypto = require('crypto')
const secret = process.env.JWT_SECRET
const iv = Buffer.alloc(16, 0) // Initialization crypto vector

// Key length is dependent on the algorithm. In this case for aes256, it is 32 bytes (256 bits).
const key = crypto.scryptSync(secret, process.env.JWT_SALT, 32)

/**
 * Decrypts text
 *
 * @param {string} text - text to decrypt
 */
const decrypt = (text = '') => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    try {
        let decrypted = decipher.update(text, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    } catch (error) {
        return error
    }
}

module.exports = { decrypt }
