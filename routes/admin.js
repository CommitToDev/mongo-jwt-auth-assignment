const express = require('express');
const router = express.Router(); 
router.use(express.json()); 
const dataBase = require('../database/database')
const jwt = require('jsonwebtoken')
const jwtPassword = 'Dev'
const adminMiddelwares = require('../middelware/adminMiddelware')


router.post('/signup', async (req, res) => {
  const {username , password} = req.body;
  try{
    const already = await dataBase.Admin.findOne({ username: username})
    
  if(password.length < 8){
    return res.json({msg: "Enter password with length minimum 8"})
  }
  if(!already){
    await dataBase.Admin.create({
      username,
      password
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
 try{const login = await dataBase.Admin.findOne({ username: username, password: password})
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
  })
 }
})

router.post('/courses',adminMiddelwares, async (req, res) => {
  try {
    const { title, description, price, imageLink } = req.body;
    const courseId = Math.floor(Math.random() * 100000);
    await dataBase.Course.create({
      title,
      description,
      price,
      imageLink,
      courseId
    });
    res.json("Course has been created");
  } catch (error) {
    res.json("Server error");
  }
});

router.get('/courses',adminMiddelwares,(req, res)=>{
  try {
       dataBase.Course.find().then((courses)=>{
        res.json(courses)
      })
  }catch(error){
    console.error(error)
    res.json("Server error");
  }
})

module.exports = router; 