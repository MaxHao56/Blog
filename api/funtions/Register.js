const mongoose = require('mongoose');
const router = require('express').Router();
const User  =  require('../models/User');
const bcrypt = require('bcrypt');


const salt = bcrypt.genSaltSync(10)


router.post('/register', async(req, res) =>{
    const {username, password} = req.body;
    const newUser = await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.status(200).json(newUser)
})

module.exports = router;