const { getUser } = require('./getUser')
const { getUsers } = require('./getUsers')
const { createUser } = require('./createUser')
const { updateUser } = require('./updateUser')
const { deleteUser } = require('./deleteUser')

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}
