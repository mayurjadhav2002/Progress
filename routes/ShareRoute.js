const express = require('express');
const share_route = express()
const bodyParser = require('body-parser');
const share_controller = require('../controllers/ShareController')

share_route.use(bodyParser.json());
share_route.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../middleware/UserAuth')


share_route.get('/', (req, res) => {
    res.send("Sharing File Route is Working")
})
share_route.post('/invite', userMiddleware.verifyToken, share_controller.shareController);


module.exports = share_route
