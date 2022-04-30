import blogService from "../services/blogs";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return action.data;
    case "USER_LOGOUT":
      return null;
    default:
      return state;
  }
};

export const userLogin = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem("loggedUserInfo", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: "USER_LOGIN",
      data: user,
    });
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUserInfo");
    blogService.setToken(undefined);
    dispatch({
      type: "USER_LOGOUT",
    });
  };
};

export default reducer;
