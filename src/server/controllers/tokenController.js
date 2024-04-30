require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const secretKey = process.env.JWT_SECRET;

const sessionController = {};
//assigns a jwt cookie on sign in
sessionController.setJWTCookieLogin = (req, res, next) => {
  if (res.locals.authenticated === false) return next();
  const { id } = res.locals.userObj;
  const token = jwt.sign(id, secretKey);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return next();
};
//assigns a jwt cookie on sign up
sessionController.setJWTCookieSignUp = (req, res, next) => {
  if (res.locals.userExists === true)return res.send(false)
  const { id } = res.locals.userInfo;
  const token = jwt.sign(id, secretKey);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return next();
};
//if user has a jwt cookie it gets sent back if not, gets sent false
sessionController.verifySession = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.send(false);
  let userID = jwt.verify(token, secretKey);
  return res.send(userID);
};

sessionController.removeJWTCookie = (req, res, next) => {
  res.clearCookie("jwt");
  return next();
};
module.exports = sessionController;
