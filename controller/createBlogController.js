const { json } = require('express');
const blogs = require('../model/createBlogSchema');
const { single } = require('../middleware/multerMidlewarew');

exports.createBlog = async (req, res) => {
        console.log("inside Create Blog Controller");
        //  console.log(req.body);

        const { title, subTitle, description, category,allowUpload,username } = req.body
        const userMail = req.payload
        // console.log(userMail);
       const thumbnail = req.file.filename
        try {
                console.log();

                const existingBlog = await blogs.findOne({ userMail, title })
                console.log(existingBlog);

                if (existingBlog) {
                        res.status(401).json("Blog Already Created Under This Title")
                }
                else {
                        const newBlog = new blogs({
                                title,
                                subTitle,
                                description,
                                category,
                                thumbnail,
                                userMail,
                                allowUpload,
                                username
                        })
                        await newBlog.save()
                        res.status(201).json(newBlog)
                }

        } catch (error) {
                res.status(500).json(error)

        }

}

// display the blog in blog page

exports.DisplayinBlogController = async(req,res)=>{
       console.log("inside DisplayinBlogController");
       const email = req.payload
       const searchKey = req.query.search
       const query = {
        userMail:{$ne:email},
        status:{$eq : "Aproved"},
        title:{$regex:searchKey,$options:"i"}
       }
       console.log(email);
       
       try {
        const usersBlog = await blogs.find(query)

       res.status(200).json(usersBlog)
       } catch (error) {
          res.status(500).json(error)
       }
       

     
}

// display latest blogs in home page

exports.displayBlogsInHomeController = async (req,res)=>{
   console.log("insdie display blog in home ");

   const email = req.payload
  console.log(email);

  try {
       const homeBlogs = await blogs.find({userMail:{$ne:email},status:{$eq : "Aproved"}}).sort({_id:-1}).limit(4)
       console.log(homeBlogs);
       
       res.status(200).json(homeBlogs) 
  } catch (error) {
        res.status(500).json(error)
  }
     
}

// view single blog 

exports.viewSingleBlogController = async(req,res)=>{
        console.log( "inside view blog controller");
        
        const {id} = req.params
        try {
        const singleBlog = await blogs.findById({_id:id})
        res.status(200).json(singleBlog)
        } catch (error) {
                res.status(500).json(error)
        }       
}

// get individual user blogs 

exports.getBlogsIndividualUserController = async (req,res)=>{
       console.log("inside getBlogsIndividualUserController");
       const userMail = req.payload
      
       console.log(userMail);
   
       try {
        const individualUser = await blogs.find({userMail})
        console.log(individualUser);
        
       res.status(200).json(individualUser)
       } catch (error) {
          res.status(500).json(error)
       }
}

// delet individual user blogs

exports.deleteIndividualUserBlogsController = async(req,res)=>{
        console.log("inside deleteIndividualUserBlogsController");
        const {blogId} = req.params
        console.log(blogId);
        
        try {
                const deletedBlog = await blogs.findByIdAndDelete({_id:blogId})
                console.log(deletedBlog);
                
                res.status(200).json(deletedBlog)
        } catch (error) {
             res.status(500).json(error)
                
        }

        
}


// update blog by id

exports.updateBlogsController = async(req,res)=>{
        console.log("inside update blog controller");
        
        const { title, subTitle, description, category,thumbnail,allowUpload,username } = req.body
        // const userMail = req.payload
        // console.log(userMail);
      const  Updatethumbnail =  req.file?req.file.filename : thumbnail

        const {blogId} = req.params
        console.log(blogId);
        

        try {
                const updateBlog = await blogs.findByIdAndUpdate(blogId,{title, subTitle, description, category,thumbnail:Updatethumbnail,allowUpload,username},{new:true})
                await updateBlog.save()
        res.status(200).json(updateBlog)
        } catch (error) {
                res.status(500).json(error)
        }
}

// ---------------admin blog controller-----------------------


// display all blogs in admin page

exports.displayAdminAllBlogs = async(req,res)=>{
       console.log("inside displayAdminPageController");

       try {
        const usersBlog = await blogs.find()

       res.status(200).json(usersBlog)
       } catch (error) {
          res.status(500).json(error)
       }   
}

// update blog status

exports.updateBlogStatus = async(req,res)=>{
    

  console.log("inside updateBlogStatus ");

  const {_id, title, subTitle,description, category,thumbnail,createdAt,userMail,allowUpload,username,status } = req.body
  try {
    const updateBlog = await blogs.findByIdAndUpdate({ _id }, { title, subTitle,description, category,thumbnail,createdAt,status:"Aproved",userMail,allowUpload,username }, { new: true })
    await updateBlog.save()
//     console.log(updateBlog);
    
    res.status(200).json(updateBlog)
  } catch (error) {
    res.status(500).json(error)
//     console.log(error);
    
  }


}

// like or unlike blog

exports.likeBlogController = async (req, res) => {
  console.log("inside like blog controller");

  const { blogId } = req.params;
  const userEmail = req.payload; // logged-in user

  try {
    const blog = await blogs.findById(blogId);

    if (!blog) {
      return res.status(404).json("Blog not found");
    }

    // LIKE / UNLIKE LOGIC
    if (blog.likes.includes(userEmail)) {
      // UNLIKE
      blog.likes = blog.likes.filter(email => email !== userEmail);
    } else {
      // LIKE
      blog.likes.push(userEmail);
    }

    await blog.save();

    return res.status(200).json({
      likes: blog.likes.length,               // count
      likedByUser: blog.likes.includes(userEmail) // boolean
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

