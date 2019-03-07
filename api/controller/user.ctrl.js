const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../auth')

module.exports.register = async function (req, res, next) {
    try {

        // check if the request is valid
        if (!req || !req.body || !req.body.data)
            throw new Error('Request must contain body and a data attribute.');

        // shorthand for req.body.data
        const reqUser = req.body.data;

        // hash the user password
        reqUser.password = bcrypt.hashSync(reqUser.password, 8);

        // check if the username already exist
        await User.findOne({
            where: {
                username: reqUser.username
            }
        }).then((user) => {
            if (user)
                throw new Error('A user with the username: ' + user.username + ' already exists');
        });

        // check if the email already exist
        await User.findOne({
            where: {
                email: reqUser.email
            }
        }).then((user) => {
            if (user)
                throw new Error('A user with the email: ' + user.email + ' already exists');
        });

        // create the user and add it to the database
        await User.create(reqUser).then((user) => {

            // generate JWT
            const jwt = auth.generateJWT(user.id);

            // attach the JWT to the created user
            const createdUser = Object.assign(user.toJSON(), {
                jwt
            });

            // response
            res.statusCode = 200;
            res.json({
                status: 'success',
                message: 'User created successfly',
                data: createdUser
            })
        });
    } catch (error) {
        next(error);
    }
}

module.exports.readProfile = async function (req, res, next) {
    try {

        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID)
            throw new Error('Bad request');

        // check if the email already exist
        await User.findOne({
            where: {
                id: req.userID,
            }
        }).then((user) => {
            if (user) {
                // respond with the current logged user
                res.statusCode = 200;
                res.json({
                    status: 'success',
                    message: 'User retrived successfly',
                    data: user
                })
            } else {
                res.status(401).send({
                    status: 'unauthorized',
                    message: 'This user is not authorized!.'
                });
            }
        });

    } catch (error) {
        next(error);
    }
}