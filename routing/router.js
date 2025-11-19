
const express = require('express')
const route = express.Router()
const userControler = require('../controller/userControl')
const createBlogController = require('../controller/createBlogController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multeConfig = require('../middleware/multerMidlewarew')
const commentController = require('../controller/commentController')
const adminJwtMiddleware = require('../middleware/adminJwtMiddleWare')
// ----------------------------  User Routes --------------

// register

route.post('/register',userControler.registerController)
// login

route.post('/login',userControler.loginController)
// google login

route.post('/google-login',userControler.googleLoginController)

// update user profile

route.put('/user-update',jwtMiddleware,multeConfig.fields([{name:'profile',maxCount:1},{name:'banner',maxCount:1}]),userControler.editUserProfileController)


// get blogs of individual users

route.get('/individual/user',jwtMiddleware,createBlogController.getBlogsIndividualUserController)

// delete blogs for individual user 

route.delete('/delete-blogs/:blogId',createBlogController.deleteIndividualUserBlogsController)

// admin profile update 

route.put('/admin-profile-edit', adminJwtMiddleware,multeConfig.single("profile"),userControler.adminProfileUpdateController);


// -----------------------bolg routes ------------------------

// add or create blog 

route.post('/create',jwtMiddleware,multeConfig.single('thumbnail',1),createBlogController.createBlog)

// display blog in blog component 

route.get('/blog',jwtMiddleware,createBlogController.DisplayinBlogController)

// display blog in Home compnnet 

route.get('/home',createBlogController.displayBlogsInHomeController)

// get a signle blogs view  

route.get('/view/:id/blog',jwtMiddleware,createBlogController.viewSingleBlogController)

// update a blog for individual user 

route.put('/update-blog/:blogId',jwtMiddleware,multeConfig.single("thumbnail",1),createBlogController.updateBlogsController)



// ------------------- comments  ----------------------

// create a comment

route.post('/create-comment/:blogId',jwtMiddleware,commentController.addNewCommentController)

// view all comments of a blog

route.get('/all-comment/:blogId',jwtMiddleware,commentController.getAllCommentsForBlogController)

// update comment

route.put('/update/comment',jwtMiddleware,commentController.editUserCommentController)

// delete comment 

route.delete('/delete/:id/comment',jwtMiddleware,commentController.deleteUserComment)

// get all individual user All Comments

// route.get('/individual-comments',jwtMiddleware,commentController.getAllCommentsForIndividualUser)



// --------------------- admin ----------------------

// display all blogs

route.get('/get-allblog-admin',adminJwtMiddleware,createBlogController.displayAdminAllBlogs)

// display all users 

route.get('/alluser-admin',adminJwtMiddleware,userControler.displayAllUsersController)

// update Blog Status

route.put('/update-status',adminJwtMiddleware,createBlogController.updateBlogStatus)


module.exports = route