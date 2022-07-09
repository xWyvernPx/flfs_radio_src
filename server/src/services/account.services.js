const Account = require("../models/account.model");

class AccountService {
  async getFullAccount(id) {
    return await Account.find({ _id: id });
  }
}
module.exports = new AccountService();
