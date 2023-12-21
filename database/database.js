const mongoose = require('mongoose')

mongoose.connect()

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
    userID:String,
    couresPurchase:String    
})

const Admin = mongoose.model('Admin',adminSchema)
const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User',userSchema)



module.exports = {
    Admin,
    Course,
    User
}