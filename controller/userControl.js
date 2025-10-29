

const users = require('../model/userSchema')
const jwt = require('jsonwebtoken')

// register

exports.registerController = async (req,res)=>{
          console.log("inside register api");
        //   console.log(req.body);
          const { username , email , password} = req.body
          console.log(username , email , password);
          try {
            const existingUser = await users.findOne({email})
            if(existingUser){
              res.status(409).json("user already exist!!! please login")
            }
            else{
              const newUser = new users({
                username,
                email,
                password
            
              })
              await newUser.save()
              res.status(200).json(newUser)
            }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}

// login

exports.loginController = async (req,res)=>{
          console.log("inside login api");
        //   console.log(req.body);
          const {email , password} = req.body
          console.log( email , password);
          try {
            const existingUser = await users.findOne({email})
          if(existingUser){
              if(existingUser.password == password){
              const token = jwt.sign({userMail:existingUser.email},process.env.JWTSECRET)
              res.status(200).json({user:existingUser,token})
            }
            else{
             
              res.status(401).json("Invalid Email Or Password")
            }
          }
          else{
           res.status(404).json("Account does not exist") 
          }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}

// google login
exports.googleLoginController = async (req,res)=>{
          console.log("inside google login api");
        //   console.log(req.body);
          const {email , password,username,profile} = req.body
          console.log( email , password,username,profile);
          try {
            const existingUser = await users.findOne({email})
          if(existingUser){
           const token = jwt.sign({userMail:existingUser.email},process.env.JWTSECRET)
              res.status(200).json({user:existingUser,token})
          }
          else{
            const newUser = new users({
              username,email,password,profile
            })
            await newUser.save()
            // token
           const token = jwt.sign({userMail:newUser.email},process.env.JWTSECRET
)
              res.status(200).json({user:newUser,token})
          }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}
// profile

// edit user profile

exports.editUserProfileController = async (req,res)=>{
  console.log("inside edit user profile");
  
  const {username,password,profile,banner,bio,insta,github,twitterx,linkedin,role}= req.body
  const email = req.payload

  // console.log("inside req ");
  // console.log( req.files?.profile[0]?.filename);
  
  
   const updateProfile = req.files?.profile?.[0]?.filename || profile
   const updatebanner = req.files?.banner?.[0]?.filename || banner

   try {
    const updatedData = await users.findOneAndUpdate({email},{username,password,profile:updateProfile,banner:updatebanner ,bio,insta,github,twitterx,linkedin,role},{new:true})
    await updatedData.save()
    res.status(200).json(updatedData)
    if(!updatedData){
      res.status(404).json("user Not Founded")
    }
   } catch (error) {
    res.status(500).json(error)
   }

}