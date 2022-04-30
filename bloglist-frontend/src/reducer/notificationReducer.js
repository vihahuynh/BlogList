let delay;
const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.data;
    default:
      return state;
  }
};

export const updateNotification = (message, isSuccess) => {
  return (dispatch) => {
    clearTimeout(delay);
    dispatch({
      type: "SET_NOTI",
      data: {
        message,
        isSuccess,
      },
    });
    delay = setTimeout(
      () =>
        dispatch({
          type: "SET_NOTI",
          data: {
            message: null,
            isSuccess,
          },
        }),
      5000
    );
  };
};

export default reducer;
