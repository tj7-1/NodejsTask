const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        unique: true,
        required: true,
  },
    description: {
        type: String,
        unique: true,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
  },
    EnrolledUsers: [
        { 
        type: mongoose.Schema.ObjectId,
        ref:'User'
        }
    ]
  },
  { timestamps: true },
);


const mycourses=new mongoose.model('Course',courseSchema)
module.exports= mycourses;