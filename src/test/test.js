import {
  connectDatabase,
  findUserByUsername,
  getUserAndPosts,
  addFriendRequest,
} from "../server.js";
import { validateUsername, validatePassword } from "../../public/utils/validation.js";
import * as chai from "chai";

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

describe("getUserAndPosts", function () {
  it("should return a user and their posts for a valid username", async function () {
    const result = await getUserAndPosts("Ayman123");
    expect(result).to.have.property("user");
    expect(result.user).to.have.property("name", "Ayman123");
    expect(result).to.have.property("posts");
    expect(result.posts).to.be.an("array");
    result.posts.forEach((post) => {
      expect(post).to.have.property("username", "Ayman123");
    });
  });

  it("should return null and an empty array for an invalid username", async function () {
    const result = await getUserAndPosts("Peter");
    expect(result).to.have.property("user", null);
    expect(result).to.have.property("posts");
    expect(result.posts).to.be.an("array").that.is.empty;
  });
});

describe("addFriendRequest", function () {
  it("should add a friend request to a user", async function () {
    const result = await addFriendRequest("Ayman123", "Hafsah");
    expect(result).to.have.property("modifiedCount", 1);
  });
});
