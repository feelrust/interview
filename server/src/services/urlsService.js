const random = require("random-string-alphanumeric-generator");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret"; // should form env

class UrlsService {
  constructor(urlsRepository) {
    this.urlsRepository = urlsRepository;
  }

  async add(req, res) {
    const { orginURl } = req.body;
    try {
      const url = await this.urlsRepository.getUrlsByOrigin(orginURl);
      if (url) {
        res.status(409).json("url already exist");
      }
      // better to use middleware
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const urlToken = random.randomAlphanumeric(5);
        const newUrls = await this.urlsRepository.create(
          orginURl,
          urlToken,
          userData.id
        );
        res.json(newUrls);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async getList(req, res) {
    try {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const urls = await this.urlsRepository.getUrlByUserId(userData.id);
        res.json(urls);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async redirect(req, res) {
    const { token } = req.params;
    try {
      const url = await this.urlsRepository.getUrlByToken(token);
      if (!url) {
        res.status(404);
      }

      res.status(301).redirect(url.origin);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = UrlsService;
