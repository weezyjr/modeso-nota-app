let router = require('express').Router();
const User = require('../controller/user.ctrl');

router.post('/register', User.register);

module.exports = router;