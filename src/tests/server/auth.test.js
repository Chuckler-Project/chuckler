const request = require("supertest");
const app = require("../../server/server");
const userModel = require("../../server/models/userModel");
const jokeModel = require("../../server/models/jokeModel");
let server;

jest.mock("../../server/models/userModel");
jest.mock("../../server/models/jokeModel");

beforeEach(() => {
  server = app.listen();
});

afterEach(async () => {
  await server.close();
});

describe("/api/user", () => {
  describe("/signup", () => {
    it("should create a user", async () => {
      userModel.getUserByEmail.mockResolvedValueOnce(null);
      userModel.createUser.mockResolvedValueOnce({
        id: "testUUID",
        username: "testUsername",
      });
      jokeModel.createJoke.mockResolvedValueOnce({
        joke_id: 1,
        content: "Test first joke",
        creator_id: "testUUID",
      });

      const response = await request(app).post("/api/user/signup").send({
        email: "test@chuckler.com",
        username: "testUsername",
        password: "testPassword",
        joke: "Test first joke",
      });

      expect(response.status).toBe(200);

      expect(response.body).toEqual("User signed up successfully!");

      expect(userModel.createUser).toHaveBeenCalledWith(
        "test@chuckler.com",
        "testUsername",
        expect.any(String)
      );

      expect(jokeModel.createJoke).toHaveBeenCalledWith(
        "Test first joke",
        "testUUID"
      );
      it("should set a JWT cookie", () => {});
      it("should set isOnline to true", async () => {});
    });
  });

  xdescribe("/login", () => {
    it("should login a user and set JWT cookie", async () => {
      userModel.getUserByEmail.mockResolvedValueOnce({
        id: "testUUID",
        username: "testUsername",
        password: "hashedPassword",
      });

      const response = await request(app).post("/api/user/login").send({
        email: "test@example.com",
        password: "testPassword",
      });

      expect(response.status).toBe(200);

      expect(response.body).toEqual("User logged in successfully!");

      expect(userModel.getUserByEmail).toHaveBeenCalledWith("test@example.com");
    });
  });

  xdescribe("/logout", () => {
    it("should logout a user, set isOnline to false, and remove JWT cookie", async () => {
      const token = "testToken";

      userModel.getUserById.mockResolvedValueOnce({
        id: "testUUID",
        username: "testUsername",
      });

      const response = await request(app)
        .post("/api/user/logout")
        .set("Cookie", [`jwt=${token}`]);

      expect(response.status).toBe(200);

      expect(response.body).toEqual("User logged out successfully!");

      expect(userModel.getUserById).toHaveBeenCalledWith("testUUID");
    });
  });
});
