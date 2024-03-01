const { SOCKET_SET } = require("./types");

export const setSocketSet = (flag) => (dispatch) => {
  dispatch({
    type: SOCKET_SET,
    payload: flag,
  });
};
