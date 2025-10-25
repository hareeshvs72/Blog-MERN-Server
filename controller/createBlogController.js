const { json } = require('express');
const blogs = require('../model/createBlogSchema')

exports.createBlog = async (req, res) => {
        console.log("inside Create Blog Controller");
        //  console.log(req.body);

        const { title, subTitle, description, category,allowUpload } = req.body
        const userMail = req.payload
        // console.log(userMail);
        var thumbnail = []
        req.files.map(item => thumbnail.push(item.filename))
        console.log(thumbnail);

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
                                allowUpload
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
       console.log(email);
       
       try {
        const usersBlog = await blogs.find({userMail:{$ne:email}})

       res.status(200).json(usersBlog)
       } catch (error) {
          res.status(500).json(error)
       }
       

     
}

