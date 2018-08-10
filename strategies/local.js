const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const configuration = {
    usernameField: 'email'
};

const handler = async function localHandler(email, password, done){
    try {
        const user = await User.find({ email: email });
        if(!user) {
            done(null, false);
        }
        // things need to change
        if(user.password !== password){
            done(null, false);
        }
        // this will prob change
        done(null, user);
    } catch (error) {
        done(error);
    }
};
const Strategy = new LocalStrategy(configuration, handler);

module.exports = Strategy;
