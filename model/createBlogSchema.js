const mongoose = require('mongoose')

const blogSchema =new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
      subTitle:{
        type: String,
        required:true
    },
      description:{
        type: String,
        required:true
    },
       category:{
        type: String,
        required:true
    },
    thumbnail:{
        type:Array,
        required:true
   }
    ,
        createdAt:{
        type: Date,
        default : Date.now
    },
         status:{
        type: String,
        default:'pending'
    },
    userMail:{
        type:String,
        required:true
    },
    allowUpload:{
        type:Boolean,
        default:false
    },
    username:{
        type:String,
        require:true
    }


    
    
})

const blogs = mongoose.model("blogs",blogSchema)

module.exports = blogs