const UserModel = require("../schemas/user");

class UserRepository {
  constructor() {
    this.user = UserModel;
  }
  async create(name, email, password) {
    return await this.user.create({
      name,
      email,
      password,
    });
  }
  async getUser(id) {
    return this.user.findOne({ id });
  }
  async getUserByEmail(email) {
    return this.user.findOne({ email });
  }
}

module.exports = UserRepository;
