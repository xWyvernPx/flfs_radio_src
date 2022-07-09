const AccountRouter = require("./account.route");
const FacebookRoute = require("./auth/facebook.route");
const GoogleRoute = require("./auth/google.route");
const videoRouter = require("./video.route");
module.exports = (app) => {
  app.use("/video", videoRouter);
  app.use("/user", AccountRouter);
  app.use("/auth/google", GoogleRoute);
  app.use("/auth/facebook", FacebookRoute);
};
