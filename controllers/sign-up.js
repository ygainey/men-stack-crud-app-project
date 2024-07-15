const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const User = require('../models/user.js');

router.get('/', async (req, res) =>{
    res.render('admin/createuser.ejs')
}) 

module.exports = router;