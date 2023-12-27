const express = require('express');
const router = express.Router(); 
router.use(express.json()); 
const dataBase = require('../database/database')
const jwt = require('jsonwebtoken')
const jwtPassword = 'user'
const userMiddelwares = require('../middelware/usermiddelware');
const mongoose = require('mongoose');




router.post('/signup', async (req, res) => {
    const {username , password} = req.body;
    
    try{
        const already = await dataBase.User.findOne({ username: username})
    if(password.length < 8){
      return res.json({msg: "Enter password with length minimum 8"})
    }
    if(!already){
    let userID = Math.floor(Math.random()*100000)
      await dataBase.User.create({
        username,
        password,
        userID
      })
      res.json({msg :"Your Account has Been Created"})
    }else{
      res.json({msg : "you are Existing user"})
    }}catch(error){
      res.json({
       msg : "Server Error"
      })
    }
  });

  router.post('/signin',async (req, res)=>{
    const {username, password} = req.body;
   try{const login = await dataBase.User.findOne({ username: username, password: password})
   if(login){
    const token = jwt.sign({username:username},jwtPassword)
    res.json({
      token
    })
   }else{
    res.json("input vaild details")
   }}catch(error){
    res.json({
      "error": "Server Error"
    }
    ,console.error(error))
   }
  })

  router.get('/courses',userMiddelwares,async(req, res)=>{
    try {
        await dataBase.Course.find().then((courses)=>{
          res.json(courses)
        })
    }catch(error){
      console.error(error)
      res.json("Server error");
    }
  })

router.post('/courses/:courseId',userMiddelwares, async (req, res) => {
  try {
      let courseId = req.params.courseId;
      const username = req.decoded.username; 
      const isValidObjectId = mongoose.Types.ObjectId.isValid(courseId);
        if (!isValidObjectId) {
            return res.json({ message: 'Invalid Course ID format' });
        }
      if (username) {
          const courseToPurchase = await dataBase.Course.findById(courseId);
          const user = await dataBase.User.findOne({ username });
          user.coursesPurchased.push(courseToPurchase);
          await user.save();

          res.json({ message: 'Course purchased successfully', purchasedCourse: courseToPurchase });
      } else {
          return res.json({ message: 'User not found' });
      }
  } catch (error) {
      console.error(error);
      res.json({ message: 'Internal server error' });
  }
});

  module.exports = router; 
  