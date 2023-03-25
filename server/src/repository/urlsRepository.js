const UrlsModel = require("../schemas/urls");

class UrlsRepository {
  constructor() {
    this.urls = UrlsModel;
  }
  async create(origin, token, userId) {
    return this.urls.create({
      createdBy: userId,
      origin,
      token,
    });
  }

  async getUrlByToken(token) {
    return this.urls.findOne({ token: token });
  }

  async getUrlsByOrigin(url) {
    return this.urls.findOne({ origin: url });
  }

  async getUrlByUserId(userId) {
    return this.urls.find({ createdBy: userId });
  }
}

module.exports = UrlsRepository;
