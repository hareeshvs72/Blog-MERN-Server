const comments = require('../model/commentModel')
const blogs = require('../model/createBlogSchema')
const users = require('../model/userSchema')

// add new comment

exports.addNewCommentController = async (req, res) => {
  console.log("inside comments controller")

  const { blogId } = req.params
  console.log(req.payload);

  const email = req.payload
  const { text } = req.body

  // console.log(email);

  try {
    const user = await users.findOne({ email })
    // console.log("found user ", user);

    const userId = user._id
    console.log(userId);
    const newComment = await comments.create({ blogId, userId, text })
    await newComment.save()
    res.status(200).json(newComment)
  } catch (error) {
    console.log(error);

  }

}

// get all comment for a perticular blog 

exports.getAllCommentsForBlogController = async (req, res) => {
  console.log("inside getAllCommentsForBlogController ");

  const { blogId } = req.params
  try {
    const allComments = await comments.find({ blogId }).populate("userId", "username email profile").sort({ createdAt: -1 })
    res.status(200).json(allComments)
    console.log(allComments);

  } catch (error) {
    res.status(500).json(error)
  }
}

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

// edit comment by the user

exports.editUserCommentController = async (req, res) => {
  console.log("inside edit user commnet controller");
  const email = req.payload
  // console.log(email);
  const { _id, text, userId } = req.body
  const getUser = await users.findOne({ email })
  // console.log(userId.email);
  
  if (userId.email == email) {
    try {
      const updateComment = await comments.findByIdAndUpdate({ _id }, { text }, { new: true })
      res.status(200).json(updateComment)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  else{
    res.status(404).json("something went wrong not found user")
  }

}

exports.deleteUserComment = async (req, res) => {
  console.log("inside delte user commnet controller");

  try {
    const { id } = req.params
    const deleteComment = await comments.findByIdAndDelete({ _id: id })
    res.status(200).json(deleteComment)
  } catch (error) {
    res.status(500).json(error)
  }

}
