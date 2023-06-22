
const mongoose = require('mongoose');
const router = require('express').Router();
const User  =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





//screte = 'aslkfjaslkaopflka';
const salt = bcrypt.genSaltSync(10);



router.post('/register', async(req, res) =>{
    const {username, password} = req.body;
    const newUser = await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.status(200).json(newUser)
})

router.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const foundUser = await User.findOne({username});
    const passOk = bcrypt.compareSync(password,foundUser.password);
    if(passOk){
        jwt.sign({username, id:foundUser._id}, screte,{},(err, token) =>{
            if (err) throw err;
            res.cookie('token', token).json({
                id:foundUser._id,
                username,
            })
        })
        }else{
            res.status(500).json('Wrong Credientials')
        }
    

})




module.exports = router
