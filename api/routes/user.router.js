let router = require('express').Router();
const User = require('../controller/user.ctrl');
const Auth = require('../auth');

router.post('/register', User.register);

router.post('/login', User.login);

router.get('/profile', Auth.decodeJWT, User.readProfile);

router.put('/profile', Auth.decodeJWT, User.updateUser);

router.delete('/profile', Auth.decodeJWT, User.deleteUser)

router.get('/search/:query', Auth.decodeJWT, User.searchForUser);

module.exports = router;