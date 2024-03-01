import { SOCKET_SET } from "../../actions/types";

const initialState = { isSocketSet: false };

const socketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SOCKET_SET:
      return {
        ...state,
        isSocketSet: payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
