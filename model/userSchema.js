const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
     profile:{
        type:String,
        default:""
    },
    banner:{
      type:String,
      default:""
    },
     bio:{
        type:String,
       default:"book store user"
    },
    
     insta:{
        type:String,
        default:""
    },
    github:{
        type:String,
        default:""
    },
     twitterx:{
        type:String,
        default:""
    },
     linkedin:{
        type:String,
        default:""
    },
     role:{
        type:String,
        default:"user"
    }
})

const users = mongoose.model('users',userSchema)
module.exports = users