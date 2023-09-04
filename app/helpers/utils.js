const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, auth) => {
        if (err) return res.sendStatus(403)

        req.auth = auth
        next()
    })
}

function generateAccessToken(data) {
    console.log('data', data);
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' });
}

function checkValidationResult(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    };
    res.status(422).json({ errors: result.array() });
};


module.exports = {
    authenticateToken,
    generateAccessToken,
    checkValidationResult
}