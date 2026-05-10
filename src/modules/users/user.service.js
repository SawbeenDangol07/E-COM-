const UserModel = require("./user.model");

class UserService {
  async storeUser(data) {
    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (exception) {
      throw exception;
    }
  }
}

const Usersrvc = new UserService();
module.exports = Usersrvc;
