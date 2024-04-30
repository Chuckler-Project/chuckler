const request = require("supertest");
const app = require("../../server/server");
const userModel = require("../../server/models/userModel");
const jokeModel = require("../../server/models/jokeModel");

jest.mock("../../server/models/userModel");
jest.mock("../../server/models/jokeModel");

xdescribe("/api/match", () => {
  describe("/", () => {
    it("should check if match already exists", async () => {});
  });
});
