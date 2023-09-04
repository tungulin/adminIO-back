const Router = require('express')
const { checkSchema } = require('express-validator');
const databaseController = require(__dir.controllers + '/database')
const { checkValidationResult } = require(__dir.helpers + '/utils')

const router = new Router()

router.post('/connect',
    checkSchema({
        hostDB: {
            isString: true
        },
        portDB: {
            isInt: true
        },
        user: {
            isString: true
        },
        password: {
            isString: true
        }
    }),
    checkValidationResult,
    async (req, res) => {
        const { hostDB, portDB, user, password } = req.body

        const token = await databaseController.connect({ host: hostDB, port: portDB, user, password })
        res.send({ token })
    }
)


module.exports = router