let router = require('express').Router();

router.use('/user', require('./user.router'));

router.use('/note', require('./notes.router'));

module.exports = router;