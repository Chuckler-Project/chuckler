require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const sessionController = {};

sessionController.setSSIDCookieLogin = (req, res, next) => {
    if (res.locals.authenticated === false) return next();
    const { id } = res.locals.userObj;
    const token = jwt.sign(id, secretKey);
    res.cookie('ssid', token, { httpOnly: true, secure: true });
    return next();
};

sessionController.setSSIDCookieSignUp = (req, res, next) => {
    if (res.locals.userExists === true) return next();
    const { id } = res.locals.userInfo;
    const token = jwt.sign(id, secretKey);
    res.cookie('ssid', token, { httpOnly: true, secure: true });
    return next();
};

sessionController.verifySession = (req, res, next) => {
    const { ssid } = res.cookie;
    if (!ssid) res.send(401).json('unauthorized');
    res.locals.userID = jwt.verify(ssid, secretKey);
    return next();
};

sessionController.removeSSIDCookie = (req, res, next) => {
    res.clearCookie('ssid');
    return next();
};

module.exports = sessionController;
