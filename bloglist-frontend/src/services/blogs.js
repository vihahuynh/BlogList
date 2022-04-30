import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

const update = (blogToUpdate) => {
  const request = axios.put(`${baseUrl}/${blogToUpdate.id}`, {
    likes: blogToUpdate.likes + 1,
  });
  return request.then((response) => response.data);
};

const comment = (blog, comment) => {
  const blogToUpdate = { ...blog };
  blogToUpdate.comments = blogToUpdate.comments
    ? blogToUpdate.comments.concat(comment)
    : [comment];
  const request = axios.put(`${baseUrl}/${blog.id}/comments`, { comment });
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response);
};

export default { getAll, get, create, update, remove, setToken, comment };
