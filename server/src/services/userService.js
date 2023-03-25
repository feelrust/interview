const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "secret"; // should form env

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(req, res) {
    const { name, email, password } = req.body;
    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid Params",
      });
    }
    try {
      const passwordHash = bcrypt.hashSync(password, bcryptSalt);
      const user = await this.userRepository.create(name, email, passwordHash);
      return res.status(201).json({
        data: user,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userRepository.getUser(id);
      return res.json({
        data: user,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const userDoc = await this.userRepository.getUserByEmail(email);
      if (userDoc) {
        const isValidPassword = bcrypt.compareSync(password, userDoc.password);
        if (isValidPassword) {
          jwt.sign(
            { email: userDoc.email, id: userDoc._id },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json(userDoc);
            }
          );
        } else {
          res.status(422).json("login failed");
        }
      } else {
        res.json("notfound");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async logout(_, res) {
    res.cookie("token", "").json(true);
  }
}

module.exports = UserService;
