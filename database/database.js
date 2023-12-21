const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://abhishekshivale21:niAcNvZX9eNR2mkS@cluster0.m1ovjoj.mongodb.net/')

const adminSchema = new mongoose.Schema({
    username:String,
    password:String
})
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    image: String,
    courseId: String
});
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    userID:String
})

const Admin = mongoose.model('Admin',adminSchema)
const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User',adminSchema)



module.exports = {
    Admin,
    Course,
    User
}