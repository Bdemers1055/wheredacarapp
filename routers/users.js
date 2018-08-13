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
        next({err});
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
        next({ msg: 'Either username or password is incorrect', status: 400 });
    }
});

//logout user by id
router.get('/logout', (req, res) => {
    res.send('user logged out');
});

const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    console.log(req.headers);
    const tokenWithBearer = req.headers.authorization;
    if(!tokenWithBearer) {
        next({ msg: 'Unauthorized', status: 401 });
    }
    const isValid = tokenWithBearer.includes('Bearer');
    // is token formatted correctly
    if(!isValid) {
        next({ msg: 'Unauthorized', status: 401 });
    }
    // this removes bearer in front of token
    const token = tokenWithBearer.slice(7)
    try {
        console.log(token);
        const payload = jwt.verify(token, process.env.SECRET);
        console.log(payload);        
        req.email = payload.email;
        req.id = payload.id;
        next();
    } catch (error) {
        next({ msg: 'Unauthorized', status: 401 });        
    }
}

//delete user for a given username(email)
router.delete('/users/:email', auth, async (req, res, next) => {
    res.send(`Deleting user with email ${req.params.email}`);
});

module.exports = router;