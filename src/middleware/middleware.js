const jwt= require("jsonwebtoken");
const {JWT_SECRET}= require('../keys');

const User = require("../models/users");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be loged in"})
    }
    const token=authorization.replace("Bearer ","")

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be loged in"});
        }
        const {_id}=payload
        req.user=payload;
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next();
        })
    })
}

