import { SHOW_UPLOAD_MODAL, SHOW_PROMPT_MODAL } from "../../actions/types";

const initialState = {
  uploadModalEnabled: false,
  promptModalEnabled: false,
};

const modalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_UPLOAD_MODAL:
      return {
        ...state,
        uploadModalEnabled: payload,
      };
    case SHOW_PROMPT_MODAL:
      return {
        ...state,
        promptModalEnabled: payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
