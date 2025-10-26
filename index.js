// import exprees cors dotenv 


   const express = require('express')
   const cors = require('cors')
   require('dotenv').config()
   const route = require('./routing/router')
  require('./db/connection')

//    create server 

const blogAppServer = express()

// enable cors 

blogAppServer.use(cors())
blogAppServer.use(express.json())
blogAppServer.use(route)
  blogAppServer.use('/uploads',express.static('./uploads'))
// port number

const PORT = 3000

// run the server in the port

blogAppServer.listen(PORT , ()=>{
    console.log(`server run ate the ${PORT} port number `);
    
})

blogAppServer.get('/',(req , res)=>{
    res.status(200).send( "<h1>blog app server run at port ... and waiting for client request !!</h1>")
})