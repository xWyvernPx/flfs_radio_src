const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, { logger: true })
  .then(() => {
    console.log("Connected to Mongoose server ok ");
  })
  .catch((e) => {
    console.log("Connected to Mongoose server fail : " + e.message);
  });

module.exports = mongoose;
