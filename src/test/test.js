import { connectDatabase, findUserByUsername } from "../server.js";
import { validateUsername, validatePassword } from "../../public/utils/validation.js";
import app from "../app.js";
import chaiHttp from "chai-http";
import * as chai from "chai";

chai.use(chaiHttp);
const expect = chai.expect;

describe("findUserByUsername", () => {
  before(async () => {
    await connectDatabase();
  });

  it("should return a user object", async () => {
    const user = await findUserByUsername("Ayman123");
    expect(user).to.be.an("object");
  });

  it("should return a user object with the correct username", async () => {
    const user = await findUserByUsername("Ayman123");
    expect(user.name).to.equal("Ayman123");
  });
});

describe("validateUsername", function () {
  it("should return isValid as true for valid usernames", function () {
    const response = validateUsername("ValidUser1");
    expect(response.isValid).to.be.true;
    expect(response.message).to.equal("");
  });

  it("should return isValid as false for usernames with less than 7 characters", function () {
    const response = validateUsername("User1");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Username must be between 7 and 15 characters long.");
  });

  it("should return isValid as false for usernames with more than 15 characters", function () {
    const response = validateUsername("ThisUsernameIsWayTooLong");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Username must be between 7 and 15 characters long.");
  });

  it("should return isValid as false for usernames with non-alphanumeric characters", function () {
    const response = validateUsername("InvalidUser!");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal(
      "Username can only contain alphanumeric characters and brackets."
    );
  });
});

describe("validatePassword", function () {
  it("should return isValid as true for valid passwords", function () {
    const response = validatePassword("ValidPassword1!");
    expect(response.isValid).to.be.true;
    expect(response.message).to.equal("");
  });

  it("should return isValid as false for passwords with less than 8 characters", function () {
    const response = validatePassword("Pass1!");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Password should be at least 8 characters long.");
  });

  it("should return isValid as false for passwords without a lowercase letter", function () {
    const response = validatePassword("PASSWORD1!");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Password should contain at least one lowercase letter.");
  });

  it("should return isValid as false for passwords without an uppercase letter", function () {
    const response = validatePassword("password1!");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Password should contain at least one uppercase letter.");
  });

  it("should return isValid as false for passwords without a number", function () {
    const response = validatePassword("Password!");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Password should contain at least one number.");
  });

  it("should return isValid as false for passwords without a special character", function () {
    const response = validatePassword("Password1");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Password should contain at least one special character.");
  });

  it("should return isValid as false for passwords with spaces", function () {
    const response = validatePassword("Password 1!");
    expect(response.isValid).to.be.false;
    expect(response.message).to.equal("Password should not contain spaces.");
  });
});

describe("GET /checkLoginStatus", () => {
  it("should return 200 when user is logged in", (done) => {
    // Create a fake session with a username
    const agent = chai.request.agent(app);
    agent.session.username = "testuser";

    agent.get("/checkLoginStatus").end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  it("should return 401 when user is not logged in", (done) => {
    chai
      .request(app)
      .get("/checkLoginStatus")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("should return 500 on error", (done) => {
    // You'll need to force an error to occur within the endpoint
    // This will depend on how you're handling sessions. Example if using express-session with a store:
    app.use((req, res, next) => {
      req.session.destroy(); // Simulate session store failure
      next();
    });

    chai
      .request(app)
      .get("/checkLoginStatus")
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});
