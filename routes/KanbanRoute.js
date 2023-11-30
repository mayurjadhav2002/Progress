const express = require('express');
const kanban_route = express()
const bodyParser = require('body-parser');
const kanban_controller = require('../controllers/KanbanController')

kanban_route.use(bodyParser.json());
kanban_route.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../middleware/UserAuth')


kanban_route.get('/', (req, res) => {
    res.send("Kanban routes are working!")
})
kanban_route.post('/getboard', userMiddleware.verifyToken, kanban_controller.getKanban);
kanban_route.put('/updateboard', userMiddleware.verifyToken, kanban_controller.updateKanban);
kanban_route.put('/updatecard/:projectId/:id/:cardId/', userMiddleware.verifyToken, kanban_controller.UpdateCard);


module.exports = kanban_route
