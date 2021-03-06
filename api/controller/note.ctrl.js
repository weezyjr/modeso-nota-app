const Note = require('../model').Note;
const User = require('../model').User;
const path = require('path')
const isAuthenticated = require('../auth').isAuthenticated;

const HOST_URL = process.env.HOST_URL || 'http://localhost:3000';

// get file extension
function getFileExtension(fileName) {
    const re = /(?:\.([^.]+))?$/;
    return re.exec(fileName)[1];
}

module.exports.uploadImage = async function (req, res, next) {
    try {
        // in case there is no files
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // check if the user is authenticated
        await isAuthenticated(User, req.userID);

        // shorthand for the file
        const file = req.files.imageFile;

        // get the file exetion
        let fileExtension = getFileExtension(file.name);

        // make sure that getFileExtension returned string
        if (fileExtension && typeof fileExtension == 'string') {
            // to avoid extension being writting in uppercase e.g. (JPEG)
            fileExtension = fileExtension.toLowerCase();
            // Allow Images only
            if (fileExtension != 'png' &&
                fileExtension != 'svg' &&
                fileExtension != 'jpg' &&
                fileExtension != 'gif' &&
                fileExtension != 'jpeg' &&
                fileExtension != 'webp') {
                throw new Error('Only image files are allowed (png,svg,jpg,jpeg,gif,webp)' +
                    ' you tried to upload ' + fileExtension);
            }
        }

        // generate new file name (file md5 hash).extension
        const fileName = file.md5 + '.' + fileExtension;

        // move to public / imgs
        const savePath = path.join(__dirname, '../public/imgs/');
        // upload the file to public/imgs
        file.mv(savePath + fileName, function (err) {
            if (err)
                return res.status(500).send(err);

            // return the image url
            const imageUrl = `${HOST_URL}/img/${fileName}`;

            // respond with the image url
            res.statusCode = 200;
            res.json({
                statusText: 'success',
                message: 'Image uploaded successfly',
                data: {
                    imageUrl
                }
            })
        });

    } catch (error) {
        next(error);
    }
}


// create new note
module.exports.create = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID || !req.body || !req.body.data)
            throw new Error('Bad request');


        // shorthand for req.body.data
        const reqNote = req.body.data;

        // check if the note is empty
        if (!reqNote.text && !reqNote.image && !reqNote.title)
            throw new Error('Can\'t create empty note!')

        // validate image url
        if (reqNote.image) {
            if (!reqNote.image.startsWith(HOST_URL)) {
                throw new Error('Invalid image source');
            }
        }

        // get the creator user
        await User.findOne({
            where: {
                id: req.userID,
            }
        }).then(async (user) => {
            if (user) {
                // create the note
                await user.createNote(reqNote).then((note) => {
                    // respond with the created note
                    res.statusCode = 200;
                    res.json({
                        statusText: 'success',
                        message: 'Note created successfly',
                        data: note
                    })
                });
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

// read user notes
module.exports.readAll = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID)
            throw new Error('Bad request');

        // get the value of isAuthenticated (the current logged in user if exist)
        await isAuthenticated(User, req.userID).then(async (user) => {
            // search for a note where it matches the author
            await Note.findAll({
                where: {
                    author: user.username
                }
            }).then((result) => {
                // if no results found
                if (!result)
                    throw new Error('Note not found');

                // respond with the created note
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'Note retrived successfly',
                    data: result
                })
            });
        });

    } catch (error) {
        next(error);
    }
}


// read all public notes
module.exports.readAllPublic = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID)
            throw new Error('Bad request');

        // get the value of isAuthenticated (the current logged in user if exist)
        await isAuthenticated(User, req.userID).then(async () => {
            // search for a note where it matches the author
            await Note.findAll({
                where: {
                    public: true
                }
            }).then((result) => {
                // if no results found
                if (!result)
                    throw new Error('Note not found');

                // respond with the created note
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'Note retrived successfly',
                    data: result
                })
            });
        });

    } catch (error) {
        next(error);
    }
}


// update note
module.exports.update = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID || !req.body || !req.body.data)
            throw new Error('Bad request');

        // the request must contain the note id
        if (!req.body.data.id)
            throw new Error('Data must include the note id')

        // shorthand for req.body.data
        const reqNote = req.body.data;

        // check if the note is empty
        if (!reqNote.text && !reqNote.image && !reqNote.title && !reqNote.public)
            throw new Error('There is not feilds to update')

        // validate image url
        if (reqNote.image) {
            if (!reqNote.image.startsWith(HOST_URL)) {
                throw new Error('Invalid image source');
            }
        }

        // get the value of isAuthenticated (the current logged in user if exist)
        await isAuthenticated(User, req.userID).then(async (user) => {
            // search for a note where it matches the id sent
            // and its author the currently logged user
            await Note.update(reqNote, {
                where: {
                    id: reqNote.id,
                    author: user.username
                }
            }).then((results) => {
                // if no results found
                if (!results[0])
                    throw new Error('Note not found');

                // respond with the created note
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'Note updated successfly',
                    data: reqNote
                })
            });
        });

    } catch (error) {
        next(error);
    }
}


// delete note
module.exports.delete = async function (req, res, next) {
    try {
        // check if the request is valid and the JWT has decoded
        if (!req || !req.userID || !req.params || !req.params.id)
            throw new Error('Bad request');

        // the request must contain the note id
        if (!req.params.id)
            throw new Error('Params must include the note id')

        // shorthand for req.body.data.id
        const noteID = req.params.id;

        // get the value of isAuthenticated (the current logged in user if exist)
        await isAuthenticated(User, req.userID).then(async (user) => {
            // search for a note where it matches the id sent
            // and its author the currently logged user
            await Note.destroy({
                where: {
                    id: noteID,
                    author: user.username
                }
            }).then((result) => {
                // if no results found
                if (!result)
                    throw new Error('Note not found');

                // respond with the created note
                res.statusCode = 200;
                res.json({
                    statusText: 'success',
                    message: 'Note deleted successfly',
                    data: result
                })
            });
        });

    } catch (error) {
        next(error);
    }
}
