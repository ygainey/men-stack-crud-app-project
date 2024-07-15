//imports
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

//import user more
const User = require('../models/user.js')

//data
const userData = require('./data/users.js')

const seedDatabase = async () => {
    try {
        //connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to database')

        //remove data from database
        const deletedUsers = await User.deleteMany();
        console.log(`deleted ${deletedUsers.deletedCount} users`)

        //create new users in DB
        const users = await User.create(userData)

        //close connection
        await mongoose.connection.close()
    } catch (error) {
      console.log(error)  
    }
}

seedDatabase()