const express = require('express');
const document_route = express()
const bodyParser = require('body-parser');
const document_controller = require('../controllers/DocumentController')

document_route.use(bodyParser.json());
document_route.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../middleware/UserAuth')

document_route.post('/createDoc', userMiddleware.verifyToken, document_controller.CreateDocument);
document_route.put('/updateDoc', userMiddleware.verifyToken, document_controller.UpdateDocument);
document_route.post('/getAllDocuments', userMiddleware.verifyToken, document_controller.getAllDocuments);
document_route.put('/getfolder', userMiddleware.verifyToken, document_controller.getAllFolder)
document_route.post('/getDocumentByFolder', userMiddleware.verifyToken, document_controller.getDocumentsByFolder)
document_route.get('/getSharedDocument', userMiddleware.verifyToken, document_controller.getSharedFolderNames)
document_route.post('/getDocumentById', userMiddleware.verifyToken, document_controller.getDocumentById);

module.exports = document_route
