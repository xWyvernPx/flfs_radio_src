const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    message: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const ChatModel = mongoose.model("ChatModel", chatSchema);

module.exports = ChatModel;
