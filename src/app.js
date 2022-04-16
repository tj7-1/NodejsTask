const express= require("express");
require("./database/connection");          //connecting our db 
//const Student=require("./models/students")        //we have to write this here only while directly calling everything in app.js
const app= express();
const port = process.env.PORT || 8000;
app.use(express.json());                //express.json() is a method inbuilt inexpress to recognize the incoming request object as a JSON object. this method is called as a middleware in your applications using the code: app.use(express.json());
const MyRouter = require("./routers/router")

app.use(MyRouter);
app.use(require('./routers/auth'));

app.listen(port,()=>{
    console.log("successful");
})
