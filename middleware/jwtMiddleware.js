const jwt = require('jsonwebtoken')

const jwtMiddleware =  (req,res,next)=>{
    console.log('Inside Jwt MiddleWare');

    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    try {
        const jwtResponse =  jwt.verify(token,process.env.JWTSECRET)
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        console.log(jwtResponse.userMail);
            next()

        
    } catch (error) {
        res.status(500).json(error)
    }
    
    
}

module.exports = jwtMiddleware