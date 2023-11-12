const express = require('express');
const user_route = express()
const bodyParser = require('body-parser');
const user_controller = require('../controllers/userController')
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));


user_route.get('/', (req,res)=>{
    res.send("hello World")
})
user_route.post('/register', user_controller.register_new_user);

user_route.post('/login', user_controller.signin)

user_route.post('/verifyEmail', user_controller.verifyEmail)

user_route.post('/create-session', user_controller.create_user_using_gauth)


module.exports = user_route
