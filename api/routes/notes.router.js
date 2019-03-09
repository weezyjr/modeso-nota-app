let router = require('express').Router();
const Note = require('../controller/note.ctrl');
const Auth = require('../auth');

router.get('/', Auth.decodeJWT, Note.readAll);

router.post('/', Auth.decodeJWT, Note.create);

router.put('/', Auth.decodeJWT, Note.update);

router.delete('/', Auth.decodeJWT, Note.update);

router.get('/public/', Auth.decodeJWT, Note.readAllPublic);

router.post('/upload/img', Auth.decodeJWT, Note.uploadImage)

module.exports = router;