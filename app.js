global.__dir = {
    root: __dirname,
    app: __dirname + '/app',
    controllers: __dirname + '/app/controllers',
    routes: __dirname + '/app/routes',
    libs: __dirname + '/app/libs',
    helpers: __dirname + '/app/helpers',
}

const express = require('express')
const dbRoutes = require(__dir.routes + '/database')
const Knex = require(__dir.libs + '/knex')
require('dotenv').config()


const app = express()
app.use(express.json());

const port = 8000

const errorHandler = (error, request, response, next) => {
    console.log(`error ${error.message}`) // log the error
}

app.use(errorHandler)
app.use('/database', dbRoutes)



const start = async () => {
    try {
        app.listen(port, () => console.log(`Server started on port ${port}`))

        global.Knex = new Knex()
    }
    catch (e) {
        console.log('error', e);
    }
}

start()