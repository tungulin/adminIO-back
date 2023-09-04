const { knex } = require('knex')


class Knex {
    connections = []

    constructor(configs = []) {
        if (configs.length !== 0)
            configs.forEach(config => {
                this.addConnection(config)
            })
    }

    addConnection(config) {
        this.connections.push({
            client: 'mysql',
            connection: config
        })
    }

    getConnection(host) {
        this.connections.find(connect => connect.connection.host === host)
    }

}

module.exports = Knex
