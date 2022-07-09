const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    name: String,
    email: { type: String },
    avatar: { type: String },
    auth: {
      facebook: {
        id: String,
      },
      google: {
        id: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
