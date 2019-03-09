let router = require('express').Router();
const Note = require('../controller/note.ctrl');
const Auth = require('../auth');

router.post('/', Auth.decodeJWT, Note.create);

router.put('/', Auth.decodeJWT, Note.update);

router.post('/upload/img', Auth.decodeJWT, Note.uploadImage)

module.exports = router;