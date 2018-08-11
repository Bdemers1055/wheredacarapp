const express = require('express');
const router = express.Router(); // tiny lego brick
const User = require('../models/user');
const passport = require('passport');

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
    const { email, password } = req.body;
    if(!email || !password) {
        next({ msg: "You have not submitted an email and password", status: 400 });
    }
    try {
        const user = new User({ email });
        user.setPassword(password);
        await user.save();
        res.redirect('/login');
    } catch (error) {
        next(error);
    }
});

//login user by id
router.post('/login', 
passport.authenticate('local', { failureRedirect: './login', session: false}), 
    async (req, res) => {
    if(req.isAuthenticated()){
        res.status(200).json({
            token: req.authInfo.token
    })
    } else {
        next({ msg: 'unauthorized', status: 401 });
    }
});

//logout user by id
router.get('/logout', (req, res) => {
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