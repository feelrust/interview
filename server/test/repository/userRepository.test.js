const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");
const UserModel = require("../../src/schemas/user");
const UserRepository = require("../../src/repository/userRepository");
describe("UserRepository", function () {
  const stubValue = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.word,
  };
  describe("create", function () {
    it("should add a new user to the db", async function () {
      const stub = sinon.stub(UserModel, "create").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.create(
        stubValue.name,
        stubValue.email,
        stubValue.password
      );
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.password).to.equal(stubValue.password);
    });
  });
  describe("getUser", function () {
    it("should retrieve a user with specific id", async function () {
      const stub = sinon.stub(UserModel, "findOne").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.getUser(stubValue.id);
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.password).to.equal(stubValue.password);
    });
  });
});
