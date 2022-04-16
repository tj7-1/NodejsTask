const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    contact: {
        type: Number,
        required: true,
  },
    email: {
        type: String,
        required: true,
  },
  password: {
    type: String,
    required: true,
},
    EnrolledCourses: [
        { 
        type: mongoose.Schema.ObjectId,
        ref:'Course'
        }
    ]
  },
  { timestamps: true },
);

// module.exports = mongoose.model('User',userSchema)
const myuser=new mongoose.model('User',userSchema)
module.exports=myuser;