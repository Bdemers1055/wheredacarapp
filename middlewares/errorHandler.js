

//error handler
module.exports = function errorHandler(err, req, res, next){
    res.status(err.status || 500).json({
            msg: err.msg || 'check it and try again'
        });
    };