const express =require("express");      //create a new router 
const router= new express.Router();
const User = require("../models/users")
const Course= require('../models/courses');     //double dot is to move outside this folder
const requiredUser= require('../middleware/middleware');
router.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  router.post('/addnewuser', async (req, res) => {
  
      const { name, contact, email ,password} = req.body;
      console.log(email);
      console.log(contact);
      const user = await User.create({
          name,
          contact,
          email:email,
          password
      })
  
      user.save();
  
      res.status(200).json({
          success: true,
          message: `User is added!`,
          user
      })
  })
  
  router.get('/users', async(req,res)=>{
      const users=await User.find();
      res.status(200).json({
          success: true,
          message: `get user`,
          users
      })
  })
  
  router.post('/addnewcourse',requiredUser, async (req, res) => {
  
      const { title, description, startDate, endDate } = req.body;


      const course = await Course.create({
          title, description, startDate, endDate
      })
  
      course.save();
  
      res.status(200).json({
          success: true,
          message: `course is added!`,
          course
      })
  })
  
  router.get('/getcourses', async(req,res)=>{
      const courses=await Course.find();
      res.status(200).json({
          success: true,
          message: `get courses`,
          courses
      })
  })
  


  router.put('/courses/:courseid',requiredUser,async(req,res)=>{
  
  
      const courseId= req.params.courseid;
      
      const C= await Course.findById(courseId);
      console.log(C.startDate);
      console.log(Date(Date.now()));
  
      const user=await User.findByIdAndUpdate(req.body.userId,{
          $push:{EnrolledCourses:courseId}
      },{
          new:true
      })
  
      const course=await Course.findByIdAndUpdate(courseId,{
          $push:{EnrolledUsers:req.body.userId}
      },{
          new:true
      })
      res.status(200).json({
          success: true,
          message: `get courses`,
          user,
          course
      })
  })
  
  router.get('/enrolledcourse',requiredUser,async(req,res)=>{
      const user=await User.findById(req.body.userId).populate('EnrolledCourses','title description')
  
      res.status(200).json({
          success: true,
          message: `get courses`,
          mycourses:user.EnrolledCourses
      })
      })
      
  router.get('/enrolledUsers/:courseid',requiredUser, async(req,res)=>{
      const courseId= req.params.courseid;
      const user=await Course.findById(courseId).populate('EnrolledUsers','name contact email')
      res.status(200).json({
          success: true,
          message: `get users`,
          mycourses:user.EnrolledUsers
      })
  })

module.exports = router;