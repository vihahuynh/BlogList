const BlogRouter = require("express").Router();
const { request } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

BlogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

BlogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id).populate("user");
  if (blog) response.json(blog);
  else response.status(404).end();
});

BlogRouter.post("/", async (request, response) => {
  const user = request.user;
  if (!user)
    return response.status(401).json({ error: "token is missing or invalid" });

  const { title, url, author, likes } = request.body;
  if (!url) return response.status(400).json({ error: "URL is missing" });

  if (!title) return response.status(400).json({ error: "Title is missing" });

  const blog = new Blog({
    url,
    title,
    author: author || null,
    likes: likes || 0,
    user: user._id,
  });

  const addedBlog = await blog.save();
  const blogs = user.blogs.concat(addedBlog._id);
  await User.findByIdAndUpdate(user._id.toString(), { blogs });
  response.status(201).json(addedBlog);
});

BlogRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);
  if (!user || user._id.toString() !== blogToDelete.user.toString())
    return response.status(403).json({ error: "permission denied" });
  await Blog.findByIdAndRemove(id);
  const blogs = user.blogs.filter((blog) => blog.toString() !== id);
  await User.findByIdAndUpdate(user._id.toString(), { blogs });
  response.status(204).end();
});

BlogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const newBlog = {
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
    new: true,
  }).populate("user");
  response.json(updatedBlog);
});

BlogRouter.put("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;
  const blogToUpdate = await Blog.findById(id).populate("user");
  const newBlog = {
    comments: blogToUpdate?.comments
      ? blogToUpdate.comments.concat(comment)
      : [comment],
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = BlogRouter;
