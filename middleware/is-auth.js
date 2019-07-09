const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; // Authorization:Bearer <token>
    if (!token || token.length === 0) {
        req.isAuth = false;
        return next();
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decoded) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decoded.userId;
    next();
}