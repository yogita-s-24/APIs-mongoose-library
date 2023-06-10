import express from 'express';
import mongoose from 'mongoose';
import Student from './models/Student.js';
import dotnv from 'dotenv';
dotnv.config();

const app = express();
 app.use(express.json());


async function connectMongoDB(){
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if(conn)
    {
        console.log('Mongo DB Connected');
    }
    else
    {
        console.log('Error');
    }
}
connectMongoDB();

app.post("/student", async(req,res)=>{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const regNo = req.body.regNo ;

    const newStud = new Student({
      fullName : fullName,
      email : email,
      regNo : regNo 
    })

    const savedStudent = await newStud.save();

    res.json({
        success :true,
        message:'Student Saved Successfully',
        data : savedStudent
    })
})

app.get('/students', async(req, res)=>{
    const students = await Student.find();

    res.json({
        success:true,
        message:'Students fetched Successfully',
        data:students
    })
})

app.get('/student',async(req, res)=>{
    const email = req.query.email;
  
    const student = await Student.findOne({email : email})
  
    if(student)
    {
      return res.json({
        success: true,
        message: "Student fetched successfully",
        data: student
      })
    }
   else{
       res.json({
         success: false,
         message: "Student not found",
         data: null
       })
   }
  
  })

app.listen(5000,()=>{
    console.log('Listen on port 5000');
})



