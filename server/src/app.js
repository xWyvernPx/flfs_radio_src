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
    origin: "https://www.flamefoxes.fun",
    // origin: "*",
    // methods: ["GET", "POST", "PUT", "PATCH"],
    // preflightContinue: true,
    credentials: true,
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://www.flamefoxes.fun");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
//   );
//   next();
// });
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    secret: "FRESHNESECOM",
    // maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    // secure: true,
    // overwrite: true,
    // httpOnly: true,
    // path: "/",
    secureProxy: true,
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
