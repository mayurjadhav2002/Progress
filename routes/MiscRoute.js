const express = require('express');
const multer = require('multer');
const miscRoute = express();
const MiscController = require('../controllers/MiscCotroller');
const bodyParser = require("body-parser");

miscRoute.use(bodyParser.json());
miscRoute.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

miscRoute.post('/upload-image', upload.single('image'), MiscController.ImageUploader);

module.exports = miscRoute