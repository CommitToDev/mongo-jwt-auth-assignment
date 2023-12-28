const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://abhishekshivale21:niAcNvZX9eNR2mkS@cluster0.m1ovjoj.mongodb.net/')

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    image: String,
    courseID: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    coursesPurchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
});

const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Admin,
    Course,
    User
};
