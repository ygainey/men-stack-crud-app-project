const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    address: String,
    aboutMe: String,
})

const employeeSchema = mongoose.Schema({
    userName: {
        type : String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,    
    },
    dOB: {
        type: Date,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        required: true
    },

    team: {
        type: String,
        required: true,
        enum: ['Engineer', 'HR', 'Marketing', 'Operations']
    },
    contact: contactSchema,
})

const User = mongoose.model('User', employeeSchema)

module.exports = User
