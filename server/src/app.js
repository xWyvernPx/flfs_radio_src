const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
require("./middleware/passport");
const Account = require("./models/account.model");
const routeSetup = require("./routes/index.route");
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    secret: "FRESHNESECOM",
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true,
    // overwrite: true,
    // httpOnly: true,
    // path: "/",
  })
);
app.use(passport.initialize());
app.use(passport.session());

routeSetup(app);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//TEST db

module.exports = app;
