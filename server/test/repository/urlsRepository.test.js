const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { faker } = require("@faker-js/faker");
const UrlsModel = require("../../src/schemas/urls");
const UrlsRepository = require("../../src/repository/urlsRepository");
describe("UrlsRepository", function () {
  const stubValue = {
    id: faker.datatype.uuid(),
    origin: faker.internet.url(),
    token: faker.random.alphaNumeric(5),
    createdBy: faker.datatype.uuid(),
  };
  describe("create", function () {
    it("should add a new url to the db", async function () {
      const stub = sinon.stub(UrlsModel, "create").returns(stubValue);
      const urlsRepository = new UrlsRepository();
      const urls = await urlsRepository.create(
        stubValue.origin,
        stubValue.token,
        stubValue.createdBy
      );
      expect(stub.calledOnce).to.be.true;
      expect(urls.id).to.equal(stubValue.id);
      expect(urls.origin).to.equal(stubValue.origin);
      expect(urls.token).to.equal(stubValue.token);
      expect(urls.createdBy).to.equal(stubValue.createdBy);
    });
  });
  describe("getUrlByToken", function () {
    it("should retrieve a url with specific token", async function () {
      const stub = sinon.stub(UrlsModel, "findOne").returns(stubValue);
      const urlsRepository = new UrlsRepository();
      const urls = await urlsRepository.getUrlByToken(stubValue.token);
      expect(stub.calledOnce).to.be.true;
      expect(urls.id).to.equal(stubValue.id);
      expect(urls.origin).to.equal(stubValue.origin);
      expect(urls.token).to.equal(stubValue.token);
      expect(urls.createdBy).to.equal(stubValue.createdBy);
    });
  });
  //etc
});
