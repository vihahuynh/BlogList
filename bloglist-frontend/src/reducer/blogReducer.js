import blogService from "../services/blogs";

const reducer = (state = "", action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return [...state, action.data];
    case "INIT_BLOGS":
      return action.data;
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog);
    dispatch({
      type: "CREATE_BLOG",
      data: savedBlog,
    });
  };
};

export const deleteBlog = (blogToRemove) => {
  return async (dispatch) => {
    await blogService.remove(blogToRemove.id);
    dispatch({
      type: "REMOVE_BLOG",
      data: blogToRemove,
    });
  };
};

export const likeABlog = (blogToLike) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogToLike);
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog,
    });
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(blog, comment);
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog,
    });
  };
};

export default reducer;
