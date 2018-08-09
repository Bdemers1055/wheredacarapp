const express = require('express');
const router = express.Router(); // tiny lego brick
const Location = require('../models/location');


//routes 

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
router.get('/locations/:id', async (req, res, next) => {
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