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

  async getSingleUserByfilter(filter) {
    try {
      const userDetail = await UserModel.findOne(filter);
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter) {
    try {
    } catch (exception) {
      throw exception;
    }
  }

  getPublicProfileOfUser(user) {
    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userObj;
  }
}

const Usersrvc = new UserService();
module.exports = Usersrvc;
