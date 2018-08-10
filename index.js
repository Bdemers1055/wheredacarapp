const express = require ('express');
const server = express();
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const passport = require ('passport');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const helmet = require ('helmet');
const localStrategy = require('./strategies/local');

// setup env variables
dotenv.config();

// passport configuration
passport.use(localStrategy);

// passport initialization
passport.initialize();

//connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// setup our port
const port = process.env.PORT || 2004;

//routers
const userRouter = require('./routers/users');
const locationRouter = require('./routers/locations');

//power-ups, middlewares
server.use(helmet());
server.use(morgan("combined")); //status logging
server.use(bodyParser.json()); //accept json data
server.use(bodyParser.urlencoded({ extended: true })); //accept html form data 
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/404');

//routes
server.use('/api', userRouter);
server.use('/api', locationRouter);

server.use(notFoundHandler);
server.use(errorHandler);

// kick it off
server.listen(port, () => {
    console.log(`now listening at port 2004`);
});

