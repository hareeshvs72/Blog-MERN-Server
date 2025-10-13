
const express = require('express')
const route = express.Router()
const userControler = require('../controller/userControl')



route.post('/register',userControler.registerController)
route.post('/login',userControler.loginController)

module.exports = route