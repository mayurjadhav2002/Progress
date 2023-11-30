
const express = require('express');
var cors = require('cors');
const { Connect } = require('./config/connect');
require('dotenv').config()
const port = process.env.PORT;
const userRoute = require('./routes/userRoute')
const projectRoute = require('./routes/projectRoute');
const kanban_route = require('./routes/KanbanRoute');
const document_route = require('./routes/DocumentRoute');


const app = express();
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));

// Mongo Connections
Connect();

// User routes
app.use('/', userRoute)
app.use('/project', projectRoute)
app.use('/kanban', kanban_route)
app.use('/document', document_route)

app.listen(port, () => console.log(`Connected to port: ${port}`));