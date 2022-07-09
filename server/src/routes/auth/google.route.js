const express = require("express");
const { model } = require("mongoose");
const passport = require("passport");
const GoogleRoute = express.Router();

GoogleRoute.get(
  "/",
  passport.authenticate("google", {
    session: true,
    scope: ["profile", "email"],
  })
);
GoogleRoute.get(
  "/callback",
  passport.authenticate("google", {
    session: true,
    successRedirect: process.env.SUCCESS_REDIRECT,
  })
);

module.exports = GoogleRoute;
