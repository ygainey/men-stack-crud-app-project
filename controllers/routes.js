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
            res.redirect('/profile')
        }
    } catch (error) {
       console.log(error) 
    }
        
})

//personal profile page
router.get('/profile', async(req, res) =>{
    try {
        res.render('user/profile.ejs')
    } catch (error) {
        console.log(error)        
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
// router.get('/directory/team/:team', async (req, res) => {
//     try {
//         const team = req.params.team  
//     } catch (error) {
//         console.log(error)  
//     }
// })

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