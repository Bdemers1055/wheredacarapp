const express = require ('express');
const server = express();
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const helmet = require ('helmet');

// setup env variables
dotenv.config();

//connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// setup our port
const port = process.env.PORT || 2004;

//models

const User = mongoose.model('User', { name: String, email: String });


//power-ups, middlewares
server.use(helmet());
server.use(morgan("combined")); //status logging
server.use(bodyParser.json()); //accept json data
server.use(bodyParser.urlencoded({ extended: true })); //accept html form data 


//routes 

//get all users
server.get('/users', async (req, res, next) => {
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
server.get('/users/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        const users = await User.find({ _id: id });
        res.status(200).json({
            users: users
        });
    }
    catch(err) {
        next(err);
    }
});

// create new user
server.post('/users/', async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({
            msg: 'created new user',
            user
        });
    } catch (error) {
        // next(err);
        res.status(500).json({
            msg: 'user not created'
        });
    }
});

//update user by id
server.put('/users/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate( id, { name, email }, { new: true });
        res.status(200).json({
            msg: 'update successful',
            pet: updatedUser
        });
    } catch(err) {
        next(err);
    }
});

//delete user by id
server.delete('/users/:id', async (req, res, next) => {
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


// kick it off
server.listen(port, () => {
    console.log(`now listening at port 2004`);
});

