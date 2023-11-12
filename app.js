
const express = require('express');
var cors = require('cors');
const { Connect } = require('./config/connect');
require('dotenv').config()
const port = process.env.PORT;
const userRoute = require('./routes/userRoute')
const projectRoute = require('./routes/projectRoute');
const { VerifyEmail } = require('./config/mails');


const app = express();
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));

// Mongo Connections
Connect();

// User routes
app.use('/', userRoute)
app.use('/project', projectRoute)

app.listen(port, () => console.log(`Connected to port: ${port}`));