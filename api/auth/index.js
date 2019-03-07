require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports.generateJWT = function (id) {
    let user = {
        id
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '30d' // expires in a month
    });
};