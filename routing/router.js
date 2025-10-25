
const express = require('express')
const route = express.Router()
const userControler = require('../controller/userControl')
const createBlogController = require('../controller/createBlogController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multeConfig = require('../middleware/multerMidlewarew')
// register

route.post('/register',userControler.registerController)
// login

route.post('/login',userControler.loginController)
// google login

route.post('/google-login',userControler.googleLoginController)

// add or create blog 

route.post('/create',jwtMiddleware,multeConfig.array('thumbnail',1),createBlogController.createBlog)

// display blog in blog component 

route.get('/blog',jwtMiddleware,createBlogController.DisplayinBlogController)
// route

module.exports = route