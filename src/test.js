import { connectDatabase, findUserByUsername } from "./server.js";
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
})
