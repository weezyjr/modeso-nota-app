const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

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
            // response
            res.statusCode = 200;
            res.json({
                status: "success",
                message: "User created successfly",
                data: user
            })
        });
    } catch (error) {
        next(error);
    }
}