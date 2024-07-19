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
        res.render('404.ejs')     
    }
    
})

//create user
router.post('/', isAdminSignedIn, async (req, res) =>{
    try {
        req.body.contact = {
            email: req.body.email,           
            phone: req.body.phone,
            address: req.body.address,
            aboutMe: req.body.aboutMe,
        }

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

        const newUser = await User.create(req.body)

        res.redirect('/index/directory')
    } catch (error) {
        res.render('404.ejs')
    }
})

//delete
router.delete('/:uID/delete', isAdminSignedIn, async (req, res) =>{
    try {
        await User.findByIdAndDelete(req.params.uID)
        res.redirect('/index/directory')   
    } catch (error) {
        res.render('404.ejs')
    }
})

//edit-update
router.get('/:uID/edit', isAdminSignedIn, async (req, res) =>{
    try {
        const uID = req.params.uID
        const foundUser = await User.findById(uID)
        res.render('admin/update.ejs', {User : foundUser})          
    } catch (error) {
        res.render('404.ejs')
    }
})

router.put('/:uID', isAdminSignedIn, async (req, res) =>{
    try {
        const uID = req.params.uID
        req.body.contact = {
            email: req.body.email,           
            phone: req.body.phone,
            address: req.body.address,
            aboutMe: req.body.aboutMe,
        }
        req.body.isAdmin = Boolean(req.body.isAdmin)
        await User.findByIdAndUpdate(uID, req.body)
        res.redirect(`/index/directory/id/${uID}`)     
    } catch (error) {
        res.render('404.ejs')
    }   
})

module.exports = router;