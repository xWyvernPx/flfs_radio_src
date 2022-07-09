const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { logger: true });

module.exports = mongoose;
