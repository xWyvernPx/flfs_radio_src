const express = require("express");
const passport = require("passport");
const FacebookRoute = express.Router();

FacebookRoute.get(
  "/",
  passport.authenticate("facebook", { session: true, scope: ["email"] })
);
FacebookRoute.get(
  "/callback",
  passport.authenticate("facebook", {
    session: true,
    successRedirect: process.env.SUCCESS_REDIRECT,
  })
);

module.exports = FacebookRoute;
