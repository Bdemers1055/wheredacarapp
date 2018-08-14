const express = require('express');
const router = express.Router(); // tiny lego brick
const User = require('../models/user');
const passport = require('passport');
const auth = require('../middlewares/auth');
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
        next({err});
    }
});

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
        next({ msg: 'Either username or password is incorrect', status: 400 });
    }
});

//logout user by id
router.get('/logout', (req, res) => {
    res.send('user logged out');
});

//delete user for a given username(email)
// TODO: You need to implement this.
router.delete('/users/:email', auth, async (req, res, next) => {
    // you should check req.email is the same as req.params.email, 
    // if yes then delete
    // if not error
    res.send(`Deleting user with email ${req.params.email}`);
});

module.exports = router;