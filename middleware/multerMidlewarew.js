const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype == "jpg" || file.mimetype == "png" || file.mimetype== "jpeg"){
        cb(null,true)
    }
    else{
        cb(null,new Error("only accept jpg png and jpeg image format"))
    }
}

const multeConfig =multer( {
    storage,
    fileFilter
})

module.exports = multeConfig