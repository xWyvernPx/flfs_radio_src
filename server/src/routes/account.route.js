const express = require("express");
const AccountRouter = express.Router();
AccountRouter.get("/me", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});
AccountRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});
module.exports = AccountRouter;
