const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { request } = require("express");

userRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;
  if (password.length < 3)
    return response.status(400).json({
      error:
        "User validation failed: password: Path `password` is shorter than the minimum allowed length (3).",
    });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });
  const savedBlog = await user.save();
  response.json(savedBlog);
});

userRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id).populate("blogs");
  if (user) return response.json(user);
  return response.status(404).end();
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = userRouter;
