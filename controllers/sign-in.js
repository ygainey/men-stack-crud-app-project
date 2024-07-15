const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

router.get('/', async (req, res) =>{
    res.render('auth/sign-in.ejs')
})

router.post('/', async (req, res) =>{
    try {
        const userInDatabase = await User.findOne({userName : req.body.username})
        if(!userInDatabase){
            return res.send('Login failed. Please try again.')
        }
        //hashed password
        // const validPassword = bcrypt.compare(req.body.password, userInDatabase.password)
        // if (!validPassword) {
        //     return res.send('Login failed. Please try again.');
        // }
        
        //non hashed for testing
        if(req.body.password !== userInDatabase.password){
            return res.send('Login failed. Please try again.');
        }
        req.session.user = {
            userName: userInDatabase.username,
            _id: userInDatabase._id,
            isAdmin: userInDatabase.isAdmin
        }
        console.log('signed in succesfully')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;