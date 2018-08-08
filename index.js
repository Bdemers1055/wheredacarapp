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

const User = mongoose.model('User', { name: String });

//routers 

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
        console.log('could not get user')
        // next(err);
    }
});



//power-ups, middlewares
server.use(helmet());
server.use(morgan("combined")); //status logging
server.use(bodyParser.json()); //accept json data
server.use(bodyParser.urlencoded({ extended: true })); //accept html form data 

// kick it off
server.listen(port, () => {
    console.log(`now listening at port 2004`);
});

