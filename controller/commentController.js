const comments = require('../model/commentModel')
const users = require('../model/userSchema')

// add new comment

exports.addNewCommentController = async(req,res)=>{
    console.log("inside comments controller")

    const {blogId}= req.params
    console.log( req.payload);
    
    const email = req.payload
    const {text}= req.body
 
    // console.log(email);
    
    try {
    const user = await users.findOne({email})
    // console.log("found user ", user);
    
     const userId = user._id
    console.log(userId);
        const newComment = await comments.create({blogId,userId,text})
        await newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
        console.log(error);
        
    }
    
}

// get all comment for a perticular blog 

exports.getAllCommentsForBlogController = async (req,res)=>{
    console.log("inside getAllCommentsForBlogController ");
    
    const {blogId} = req.params
    try {
         const allComments = await comments.find({blogId}).populate("userId", "username profile" ).sort({createdAt:-1})
         res.status(200).json(allComments)
         console.log(allComments);
         
    } catch (error) {
        res.status(500).json(error)
    }
}