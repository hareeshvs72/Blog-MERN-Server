const comments = require('../model/commentModel')
const blogs = require('../model/createBlogSchema')
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

// get all comments for a individual user

// exports.getAllCommentsForIndividualUser = async (req,res)=>{
//        console.log("inside getAllCommentsForIndividualUser");
//        const email = req.payload
//        const userDetail = await users.findOne({email})
//        const id = userDetail._id
//        console.log(id);
   
//        try {
//         const individualComments = await comments.find({userId:id}).populate("blogId", "title")
//         console.log(individualComments);
        
//        res.status(200).json(individualUser)
//        } catch (error) {
//           res.status(500).json(error)
//        }
// }

exports.getAllCommentsForIndividualUser = async (req, res) => {
  console.log("Inside getAllCommentsForIndividualUser");

  const email = req.payload; // email from JWT middleware
  try {
    // 1️⃣ Find the authorized user (blog author)
    const userDetail = await users.findOne({ email });
    if (!userDetail) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userDetail._id;
    console.log("User ID:", userId);

    // 2️⃣ Find all blogs written by this user
    const userBlogs = await blogs.find({ author: userId }).select("_id title");
    const blogIds = userBlogs.map((b) => b._id);

    if (blogIds.length === 0) {
      return res.status(200).json({ count: 0, comments: [] });
    }

    // 3️⃣ Find comments on these blogs (excluding the author’s own comments)
    const individualComments = await comments
      .find({
        blogId: { $in: blogIds },
        userId: { $ne: userId },
      })
      .populate("blogId", "title")
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    console.log("Comments found:", individualComments.length);

    // 4️⃣ Send response
    res.status(200).json({
      count: individualComments.length,
      comments: individualComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};



