const ChatModel = require("../models/chat.model.js");
const chatService = {
  addChat: async (authorId, message) => {
    return await ChatModel.create({ author: authorId, message: message });
  },
  getChats: async () => {
    return await ChatModel.find(
      {},
      {},
      { limit: 20, sort: { createdAt: -1 } }
    ).populate("author");
  },
};

module.exports = chatService;
