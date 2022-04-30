const jwt = require("jsonwebtoken");
const User = require("../models/user");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("../utils/configs");

loginRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect)
    return response.status(401).json({ error: "invalid userame or password" });

  const userForToken = {
    username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET);
  response.status(200).send({ token, username, name, id: user._id });
});

module.exports = loginRouter;
