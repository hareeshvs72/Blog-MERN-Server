
const express = require('express')
const route = express.Router()
const userControler = require('../controller/userControl')
const createBlogController = require('../controller/createBlogController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multeConfig = require('../middleware/multerMidlewarew')
const commentController = require('../controller/commentController')
// ----------------------------  User Routes --------------

// register

route.post('/register',userControler.registerController)
// login

route.post('/login',userControler.loginController)
// google login

route.post('/google-login',userControler.googleLoginController)

// update user profile

route.put('/user-update',jwtMiddleware,multeConfig.fields([{name:'profile',maxCount:1},{name:'banner',maxCount:1}]),userControler.editUserProfileController)

// -----------------------bolg routes ------------------------

// add or create blog 

route.post('/create',jwtMiddleware,multeConfig.array('thumbnail',1),createBlogController.createBlog)

// display blog in blog component 

route.get('/blog',jwtMiddleware,createBlogController.DisplayinBlogController)

// display blog in Home compnnet 

route.get('/home',createBlogController.displayBlogsInHomeController)

// get a signle blogs view  

route.get('/view/:id/blog',jwtMiddleware,createBlogController.viewSingleBlogController)


// ------------------- comments  ----------------------

// create a comment

route.post('/create-comment/:blogId',jwtMiddleware,commentController.addNewCommentController)

route.get('/all-comment/:blogId',jwtMiddleware,commentController.getAllCommentsForBlogController)


module.exports = route