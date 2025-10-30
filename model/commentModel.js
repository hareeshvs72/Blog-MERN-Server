const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogs",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
          type: Date,
          default:Date.now
    }
})

const comments = mongoose.model("comments",commentSchema)
module.exports = comments