const express = require('express');
const cors = require('cors');
const User =require('./user.js');
const router = express.Router();


router.get('/account/create/:name/:email/:password', async function (req, res) {
    try{
        let user = await User.find({
            email: req.params.email,
            new: true,
        });
        if(user.length > 0){
            res.status(400).json({
                status: 400,
                message: 'User already in exists',
            })
        }
        router.create(req.params.name,req.params.email,req.params.password);
            res.status(200).json({
                status: 200,
                data: user,
                message: 'User created',
        })
    }
    catch(err){
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports =router;



    
 