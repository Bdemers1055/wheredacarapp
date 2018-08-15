const express = require('express');
const router = express.Router(); // tiny lego brick
const Location = require('../models/location');
const auth = require('../middlewares/auth');

router.use(auth); //protects all routes
const location = require('../models/location');
// setup location routes

//get all locations
router.get('/locations', async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.status(200).json({
            locations: locations
        });
    } 
    catch(err) {
        next(err);
    }
});


// get location by id
router.get('/locations', async (req, res, next) => {
    const { id } = req.params; 
    try {
        const locations = await Location.find({ _id: id });
        res.status(200).json({
            locations: locations
        });
    }
    catch(err) {
        next(err);
    }
});



module.exports = router;