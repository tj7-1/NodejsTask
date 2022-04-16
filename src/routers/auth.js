const express = require('express');
const router = express.Router();

const bcrpt = require('bcryptjs');

const jwt= require('jsonwebtoken');

const {JWT_SECRET}= require('../keys');
const User= require('../models/users')

router.get('/', (req, res) => {
    res.send("hello");
});


router.post('/signup', (req, res) => {
    const { name, email, password, contact } = req.body;

    if (!email || !password || !name || !contact) {
        return res.status(422).json({ error: "please add all the fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {

            if (savedUser) {
                return res.status(422).json({ error: "user already exist" });
            }

            bcrpt.hash(password, 12)
                .then(hashedpassword => {

                    const users = new User({
                        name,
                        contact,
                        email,
                        password:hashedpassword
                    })

                    users.save()
                        .then(users => {
                            res.json({ message: "saved successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })

        })
        .catch(err => {
            console.log(err);
        })
})


router.post('/signin',(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(422).json({error:"Please add email and password"});
    }

    User.findOne({email:email})
        .then(savedUser=>{

            if(!savedUser){
                return res.status(422).json({error:"Invalid email or password"});
            }

            bcrpt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    const token=jwt.sign({_id:savedUser._id},JWT_SECRET)

                    const {_id,name,email}= savedUser;
                    res.json({token,User:{_id,name,email}});
                }

                else{
                    return res.status(422).json({error:"Please add email and password"})
                }
            })
            .catch(err=>{
                consol.log(err);
            })
    })
})


module.exports = router;