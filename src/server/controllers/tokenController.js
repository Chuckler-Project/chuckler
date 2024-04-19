require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const sessionController = {};

sessionController.setJWTCookieLogin = (req, res, next) => {
  if (res.locals.authenticated === false) return next();
  const { id } = res.locals.userObj;
  const token = jwt.sign(id, secretKey);
  res.cookie('jwt', token, { httpOnly: true, secure: true });
  return next();
};

sessionController.setJWTCookieSignUp = (req, res, next) => {
  if (res.locals.userExists === true) return next();
  const { id } = res.locals.userInfo;
  const token = jwt.sign(id, secretKey);
  res.cookie('jwt', token, { httpOnly: true, secure: true });
  return next();
};

sessionController.verifySession = (req, res, next) => {
  const { token } = res.cookie;
  if (!token) res.send(401).json('unauthorized');
  res.locals.userID = jwt.verify(token, secretKey);
  return next();
};

sessionController.removeJWTCookie = (req, res, next) => {
  res.clearCookie('jwt');
  return next();
};

module.exports = sessionController;
