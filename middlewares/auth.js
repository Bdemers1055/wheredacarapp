
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    console.log(req.headers);
    const tokenWithBearer = req.headers.authorization;
    if(!tokenWithBearer) {
        return next({ msg: 'Unauthorized', status: 401 });
    }
    const isValid = tokenWithBearer.includes('Bearer');
    // is token formatted correctly
    if(!isValid) {
        return next({ msg: 'Unauthorized', status: 401 });
    }
    // this removes bearer in front of token
    const token = tokenWithBearer.slice(7)
    try {
        const payload = jwt.verify(token, process.env.SECRET);
        req.email = payload.email;
        req.id = payload.id;
        return next();
    } catch (error) {
        return next({ msg: 'Unauthorized', status: 401 });        
    }
}
