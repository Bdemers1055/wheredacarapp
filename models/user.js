const mongoose = require ('mongoose');
const Schema = mongoose.Schema; // Schema class
const crypto = require('crypto');

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
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId
    }
});

userSchema.methods.setPassword = function setPassword(password){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512')
                        .toString('hex');
    this.salt = salt;
    this.hash = hash;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
