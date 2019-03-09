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
