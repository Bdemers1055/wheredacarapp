

//error handler
module.exports = function errorHandler(err, req, res, next){
    const isDev = process.env.NODE_ENV === 'development';
    if(isDev){
        console.log('Error: ', err);
    }
    res.status(err.status || 500).json({
            msg: err.msg || 'check it and try again'
        });
    };