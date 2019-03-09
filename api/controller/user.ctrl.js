const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../auth')
const isAuthenticated = require('../auth').isAuthenticated;

// register new user
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
                statusText: 'success',
                message: 'User created successfly',
                data: createdUser
            })
        });
    } catch (error) {
        next(error);
    }
}

// read the logged in profile
module.exports.readProfile = async function (req, res, next) {
    try {

        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID)
            throw new Error('Bad request');

        // get the user
        await User.findOne({
            where: {
                id: req.userID,
            }
        }).then((user) => {
            if (user) {
                // respond with the current logged user
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'User retrived successfly',
                    data: user
                })
            } else {
                res.status(401).send({
                    statusText: 'unauthorized',
                    message: 'This user is not authorized!.'
                });
            }
        });

    } catch (error) {
        next(error);
    }
}

// login and authenticate
module.exports.login = async function (req, res, next) {
    try {
        // check if the request is valid
        if (!req || !req.body || !req.body.data || !req.body.data.username || !req.body.data.password)
            throw new Error('Request must contain username and password');

        // shorthand for req.body.data
        const reqUser = req.body.data;

        // check if the username exist
        await User.findOne({
            where: {
                username: reqUser.username
            }
        }).then((user) => {

            // there is no user with that username
            if (!user)
                throw new Error('The username: ' + reqUser.username + ' doesn\'t exists');

            // compare the passwords
            const passwordMatch = bcrypt.compareSync(reqUser.password, user.password);

            if (passwordMatch) {

                // generate JWT
                const jwt = auth.generateJWT(user.id);

                // attach the JWT to the created user
                const createdUser = Object.assign(user.toJSON(), {
                    jwt
                });

                // respond with user object 
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'User has logged successfly',
                    data: createdUser
                });
            } else {
                // the username match but the password doesn't
                res.status(401).send({
                    statusText: 'unauthorized',
                    message: 'The password is incorrect!.'
                });
            }
        });

    } catch (error) {
        next(error);
    }
}

// search for user by username or email
module.exports.searchForUser = async function (req, res, next) {
    try {
        // check if the request is valid
        if (!req || !req.params || !req.params.query)
            throw new Error('Request must contain body and a query parameter.');

        
        // check if the user is authenticated
        await isAuthenticated(User, req.userID);

        // shorthand for req.body.query
        const query = req.params.query;

        await User.findAll({
            where: {
                $or: [{
                    // search by exact email
                    email: {
                        $eq: query
                    }
                }, {
                    // search by alike username
                    username: {
                        like: '%' + query + '%'
                    }
                }, {
                    fullname: {
                        // search by alike fullname
                        like: '%' + query + '%'
                    }
                }]
            },
            attributes: ['username', 'fullname', 'id']
        }).then((users) => {
            if (users) {
                // respond with the users
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'Users was found successfly',
                    data: users
                });
            } else {
                // respond with empty array (no users)
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'No user was found',
                    data: []
                });
            }
        });

    } catch (error) {
        next(error);
    }
}


// update user
module.exports.updateUser = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID || !req.body || !req.body.data)
            throw new Error('Bad request');


        // check if the user is authenticated
        await isAuthenticated(User, req.userID);
        
        // shorthand for req.body.data
        const reqUser = req.body.data;

        // encrypt password if exist
        if (reqUser.password)
            reqUser.password = bcrypt.hashSync(reqUser.password, 8);

        // check if the username already exist
        await User.findOne({
            where: {
                username: reqUser.username,
                // exclude the user being updated
                id: {
                    $not: req.userID
                }
            }
        }).then((user) => {
            if (user)
                throw new Error('A user with the username: ' + user.username + ' already exists');
        });

        // check if the email already exist
        await User.findOne({
            where: {
                email: reqUser.email,
                // exclude the user being updated
                id: {
                    $not: req.userID
                }
            }
        }).then((user) => {
            if (user)
                throw new Error('A user with the email: ' + user.email + ' already exists');
        });


        // update the current user
        await User.update(reqUser, {
            where: {
                id: req.userID
            }
        }).then(() => {
            // respond with the updated feilds
            res.statusCode = 200;
            res.json({
                statusText: 'success',
                message: 'User updated successfly',
                data: reqUser
            })
        })

    } catch (error) {
        next(error);
    }
}


// delete the current user
module.exports.deleteUser = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID)
            throw new Error('Bad request');

        
        // check if the user is authenticated
        await isAuthenticated(User, req.userID);

        // delete the current user
        await User.destroy({
            where: {
                id: req.userID,
            }
        }).then(() => {
            // respond with the success
            res.statusCode = 200;
            res.json({
                statusText: 'success',
                message: 'User deleted successfly',
                data: {}
            })
        });

    } catch (error) {
        next(error);
    }
}