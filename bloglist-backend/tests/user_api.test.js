const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("creating a new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("succeeds create user", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      name: "Test User",
      username: "testuser",
      password: "topsecret",
    };

    const a = await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    const allUsername = usersAtEnd.map((user) => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(allUsername).toContain(newUser.username);
  });

  test("fail to create user: existed username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      password: "topsecret",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("fail to create user: username's length less than 3", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "fs",
      password: "topsecret",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      `User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`
    );

    const usersAtEnd = await helper.usersInDb();
    const allUsername = usersAtEnd.map((user) => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(allUsername).not.toContain(newUser.username);
  });

  test("fail to create user: password's length less than 3", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "shortpassword",
      password: "fs",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      `User validation failed: password: Path \`password\` is shorter than the minimum allowed length (3).`
    );

    const usersAtEnd = await helper.usersInDb();
    const allUsername = usersAtEnd.map((user) => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(allUsername).not.toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
