require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretcode';

module.exports.generateJWT = function (id) {
    // encoded object
    let user = {
        id
    };

    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '30d' // expires in a month
    });
};

module.exports.decodeJWT = async function (req, res, next) {
    try {
        // read the x-access-token header
        const token = req.headers['x-access-token'];

        // in case of missing x-access-token header
        if (!token) return res.status(401).send({
            status: 'unauthorized',
            message: 'No token provided.'
        });

        // verify and decode the token
        await jwt.verify(token, JWT_SECRET, function (err, decodedObject) {
            // if the token is fake
            if (err || !decodedObject) return res.status(500).send({
                status: 'unauthorized',
                message: 'Failed to authenticate token.'
            });

            // save the decoded user id in the request
            req.userID = decodedObject.id;

            // move to the controller
            next();
        });
    } catch (error) {
        next(error);
    }
}
