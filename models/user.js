const mongoose = require ('mongoose');
const Schema = mongoose.Schema; // Schema class

const userSchema = new Schema({ // userSchem is a variable name
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 64
    },
    name: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
