const express = require('express');
const router = express.Router(); // tiny lego brick
const Location = require('../models/location');
const auth = require('../middlewares/auth');

router.use(auth); //protects all routes
const location = require('../models/location');
// setup location routes

//get a specific location info by user id
router.get('/locations', async (req, res, next) => {
    try {
        const location = await Location.findOne( {user: req.id });
        res.status(200).json({
            location
        });
    } 
    catch(error) {
        next(error);
    }
});

//create a location 
router.post('/locations', async (req, res, next) =>{
    const { lat, lon } = req.body;
    if(!lat || !lon) {
        next({ msg: 'Need to supply lat and lon', status: 400 })
    }
    try {
        const location = new Location({lat, lon, user: req.id });
        await location.save();
        res.status(201).json({
            msg: 'created a new location'
        });
    } catch (error) {
        next(error);
    }
});

// delete location by user id
router.delete('/locations', async (req, res, next) => {
    try {
       await Location.findOneAndRemove({ user: req.id });
       res.status(200).json({
           msg: 'successfully deleted'
       }); 
    } catch (error) {
        next(error);
    }
});



module.exports = router;