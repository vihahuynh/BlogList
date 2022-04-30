const Blog = require("../models/blog");
const User = require("../models/user");

const initBlogs = [
  {
    author: "Nemo",
    title: "Museum",
    url: "museum.com",
    likes: 4,
  },
  {
    author: "Zelda",
    title: "Hanoi in the rain",
    url: "hanoi.com.vn",
    likes: 6,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate("user");
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
