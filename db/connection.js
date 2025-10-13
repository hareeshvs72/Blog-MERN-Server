

const mongoose = require('mongoose')
const connectionstring = process.env.DBCONNECTIONSTRING
mongoose.connect(connectionstring).then(res=>{
    console.log("db connection sucessfully");
    
}).catch(err=>{
    console.log("db connection failed");
    console.log(err);
    
    
})

