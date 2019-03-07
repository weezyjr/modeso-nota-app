let router = require('express').Router();
const User = require('../controller/user.ctrl');
const Auth = require('../auth');

router.post('/register', User.register);

router.post('/login', User.login);

router.get('/profile', Auth.decodeJWT, User.readProfile);

module.exports = router;