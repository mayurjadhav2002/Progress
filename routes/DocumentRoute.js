const express = require('express');
const document_route = express()
const bodyParser = require('body-parser');
const document_controller = require('../controllers/DocumentController')

document_route.use(bodyParser.json());
document_route.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../middleware/UserAuth')

document_route.post('/createDoc', userMiddleware.verifyToken, document_controller.CreateDocument);
document_route.put('/updateDoc', userMiddleware.verifyToken, document_controller.UpdateDocument);
document_route.get('/getfolder', userMiddleware.verifyToken, document_controller.getAllFolder)
document_route.get('/getDocumentByFolder', userMiddleware.verifyToken, document_controller.getDocumentsByFolder)
document_route.get('/getSharedDocument', userMiddleware.verifyToken, document_controller.getSharedFolderNames)


module.exports = document_route
