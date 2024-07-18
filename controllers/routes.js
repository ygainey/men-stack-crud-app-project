const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

//render log page after login
router.get('/', async (req, res) => {
    try {
        if(req.session.user.isAdmin){
            res.render('admin/index.ejs')
        } else {
            res.redirect('/index/profile')
        }
    } catch (error) {
       console.log(error) 
    }
        
})

//personal profile page
router.get('/profile', async(req, res) =>{
    try {
        const userID = req.session.user._id
        const foundUser = await User.findById(userID)
        res.render('user/profile.ejs', {User: foundUser})
    } catch (error) {
        console.log(error)        
    }
})

//profile edit
router.get(('/profile/edit'), async (req, res) => {
    try {
        const userID = req.session.user._id
        const foundUser = await User.findById(userID)
        res.render('user/editprofile.ejs', {User: foundUser})
    } catch (error) {
        console.log(error)        
    }
})

router.put(('/profile/edit/confirm'), async (req, res) =>{
    try {
        const uID = req.session.user._id
        req.body.contact = {
            email: req.body.email,           
            phone: req.body.phone,
            address: req.body.address,
            aboutMe: req.body.aboutMe,
        }
        await User.findByIdAndUpdate(uID, req.body)

        res.redirect('/index/profile') 
    } catch (error) {
        
    }
})

//password edit
router.get(('/profile/edit-pass'), async (req, res) =>{
    try {
        const userID = req.session.user._id
        const foundUser = await User.findById(userID)
        res.render('user/editpassword.ejs')
    } catch (error) {
        console.log(error)        
    }
})

router.put(('/profile/edit-pass/confirm'), async (req, res) => {
    try {
        const uID = req.session.user._id
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword; 
        await User.findByIdAndUpdate(uID, req.body)

        res.redirect('/index/profile')        
    } catch (error) {
        
    }
})

//full user directory
router.get('/directory', async (req, res) => {
    try {
        const allUsers = await User.find()
        res.render('user/show.ejs', {User : allUsers}) 
    } catch (error) {
        console.log(error)
    }    
})

//per team diectory
router.get('/directory/team/:teamName', async (req, res) => {
    try {
        const team = req.params.teamName
        const foundTeam = await User.find({team : team}) 
        res.render('user/showteam.ejs', {team: foundTeam, teamName: team}) 
    } catch (error) {
        console.log(error)  
    }
})



// idividual data
router.get('/directory/id/:uID', async (req, res) =>{
    try {
        const userID = req.params.uID
        const foundUser = await User.findById(userID).populate('contact')
        if(req.session.user.isAdmin){
            res.render('admin/showuser.ejs', {User : foundUser})
        }else{
            res.render('user/showuser.ejs', {User : foundUser})
        }
    } catch (error) {
        console.log(error) 
    }
})

module.exports = router;