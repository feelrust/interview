const chai = require("chai");
const sinon = require("sinon");
const UserRepository = require("../../src/repository/userRepository");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");
const UserService = require("../../src/services/userService");

describe("UserService", function () {
  describe("register", function () {
    let status, json, res, userRepo, userService;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      userRepo = new UserRepository();
      userService = new UserService(userRepo);
    });
    it("should not register a user when name param is not provided", async function () {
      const req = { body: { email: faker.internet.email() } };
      await userService.register(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
    it("should not register a user when name and email params are not provided", async function () {
      const req = { body: {} };
      await userService.register(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
    it("should not register a user when email param is not provided", async function () {
      const req = { body: { name: faker.name.fullName() } };
      await userService.register(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid Params");
    });
    //etc
  });
});
