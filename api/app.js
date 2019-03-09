/**
 * MODESO
 * NOTA API V1
 * Author: Ahmed Adel
 */


// require npm modules
const express = require('express')
const parseError = require('parse-error');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const logger = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');


// get environment variables
require('dotenv').config()


// setting up express app
const app = express()
const PORT = process.env.PORT || 3000


//----- MiddleWares -----//
// to extraxt JSON body portion of an incoming request
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//  secure your Express apps by setting various HTTP headers
app.use(helmet())


// Log requests to the console.
app.use(logger('dev'));


// allow cors headers
// TODO: config cors headers before deploying
app.use(cors())


// to limit repeated requests to public APIs 
app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100 // limit each IP to 100 requests per minute
}));



// allow file uploading
app.use(fileUpload({
    safeFileNames: true, // strip slashes from file names
    preserveExtension: 4, // Preserves filename extension up to 4 char. when using safeFileNames
    abortOnLimit: true, // Returns a HTTP 413 when the file is bigger than the size limit 
    limits: {
        // max 25mb file
        fileSize: 25 * 1024 * 1024
    }, 
}));

//----- Routes -----//

// allow access to public/imgs
app.use('/img', express.static(path.join(__dirname, 'public/imgs')))


// server check
app.get('/', function (req, res) {
    res.statusCode = 200;
    res.json({
        statusText: "success",
        message: "Nota API is running"
    })
})


// API routes
app.use('/api/v1', require('./routes'));


// prevent robots from accessing the APIs
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    return res.send('User-agent: *\nDisallow: /');
});


//----- Error Handling Middlewares -----//
// not found route error (404)
app.use(function (req, res, next) {
    // respond with status code 400 and the wrong route
    res.statusCode = 400;
    res.json({
        statusText: "error",
        message: 'Route ' + req.url + ' Not found.'
    })
});


// bad request error (500)
app.use(function (err, req, res, next) {
    // parse error object
    const message = parseError(err).message || 'something went wrong !';

    // respond with status code 500 and the error message
    res.statusCode = 500;
    res.json({
        statusText: "error",
        message
    })
});


// emitted whenever a Promise has been rejected and an error handler was attached to it 
process.on('unhandledRejection', (err) => {
    console.error('Uncaught Error', parseError(err));
});


//----- Run the server -----//
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})