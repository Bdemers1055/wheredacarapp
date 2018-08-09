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
// router.get('/users/:id', async (req, res, next) => {
//     const { id } = req.params; 
//     try {
//         const users = await User.find({ _id: id });
//         res.status(200).json({
//             users: users
//         });
//     }
//     catch(err) {
//         next(err);
//     }
// });

// signup new user 
router.post('/signup/', async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({
            msg: 'created new user',
            user
        });
    } catch (error) {
        next(err);
    }
});

//login user by id
router.post('/users/:id', (req, res) => {
    res.send('user logged in');
});

//logout user by id
router.get('/users/:id', (req, res) => {
    res.send('user logged out');
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