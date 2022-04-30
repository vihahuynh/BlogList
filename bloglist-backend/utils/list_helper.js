const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  else if (blogs.length === 1) return blogs[0].likes;
  else {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }
};

const favorateBlog = (blogs) => {
  if (blogs.length === 0) return null;
  else if (blogs.length === 1)
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  else {
    const likes = blogs.map((blogs) => blogs.likes);
    const maxLikes = Math.max(...likes);
    const index = likes.indexOf(maxLikes);
    return {
      title: blogs[index].title,
      author: blogs[index].author,
      likes: blogs[index].likes,
    };
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  else if (blogs.length === 1)
    return {
      author: blogs[0].author,
      blogs: 1,
    };
  else {
    return _(blogs)
      .groupBy("author")
      .map((blog) => ({
        author: blog[0].author,
        blogs: blog.length,
      }))
      .maxBy("blogs");
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  else if (blogs.length === 1)
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  else {
    return _(blogs)
      .groupBy("author")
      .map((blog) => ({
        author: blog[0].author,
        likes: _.sumBy(blog, "likes"),
      }))
      .maxBy("likes");
  }
};

module.exports = {
  dummy,
  totalLikes,
  favorateBlog,
  mostLikes,
  mostBlogs,
};
