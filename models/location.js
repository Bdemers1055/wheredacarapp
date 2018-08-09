const mongoose = require ('mongoose');
const Schema = mongoose.Schema; // Schema class

const locationSchema = new Schema({ // locationSchem is a variable name
    lat: {
        type: Number,
        required: true,
        unique: true,
        minlength: -90,
        maxlength: 90,
    },
    lon: {
        type: Number,
        required: true,
        unique: true,
        minlength: -180,
        maxlength: 180,
    },
    user: {
        type: Schema.Types.ObjectId
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
