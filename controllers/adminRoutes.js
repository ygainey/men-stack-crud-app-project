const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const User = require('../models/user.js');
const isAdminSignedIn = require('../middleware/is-admin.js');

//create user
router.get('/sign-up', isAdminSignedIn, async (req, res) =>{
    try {
        res.render('admin/createuser.ejs')
    } catch (error) {
        console.log(error)     
    }
    
})

//create user
router.post('/', isAdminSignedIn, async (req, res) =>{
    try {
        // if(){
        //     throw new Error('Invalid input: Please complete all fields')
        // }
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ userName: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.');
        }
  
        // Username is not taken already!
        // Check if the password and confirm password match
        if (req.body.password !== req.body.confirmpassword) {
            return res.send('Password and Confirm Password must match');
        }
  
        // Match hash the password before sending to the database
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        // Convert tick-box Boolean
        req.body.isAdmin = Boolean(req.body.isAdmin)

        await User.create(req.body)
        res.redirect('/index')
    } catch (error) {
        //res.render('/sign-up.ejs', {errorMessage : error.message})
        console.log(error) 
    }
})

router.delete('/:uID/delete', isAdminSignedIn, async (req, res) =>{
    await User.findByIdAndDelete(req.params.uID)
    res.redirect('/index/directory')
})

router.get('/:ID/edit', isAdminSignedIn, async (req, res) =>{
    await User.findByIdAndDelete(req.params.uID)
})

module.exports = router;