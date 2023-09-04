const { authenticateToken, generateAccessToken } = require(__dir.helpers + '/utils')


const connect = ({ host, port, user, password }) => {
    Knex.addConnection({ host, port, user, password })
    return generateAccessToken({ connections: Knex.connections })
}

module.exports = {
    connect
}
