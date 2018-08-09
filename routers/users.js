const express = require('express');
const router = express.Router(); // tiny lego brick
const User = require('../models/user');


//routes 

//get all users
router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users: users
        });
    } 
    catch(err) {
        next(err);
    }
});


// get user by id
router.get('/users/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        const users = await User.find({ _id: id });
        res.status(200).json({
            users: users
        });
    }
    catch(err) {
        next(err);
    }
});

// create new user
router.post('/users/', async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({
            msg: 'created new user',
            user
        });
    } catch (error) {
        // next(err);
        res.status(500).json({
            msg: 'user not created'
        });
    }
});

//update user by id
router.put('/users/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate( id, { name, email }, { new: true });
        res.status(200).json({
            msg: 'update successful',
            pet: updatedUser
        });
    } catch(err) {
        next(err);
    }
});

//delete user by id
router.delete('/users/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        await User.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'yay deleted!'
        });
    }
    catch(err) {
            next(err);
    }
});

module.exports = router;