import { SHOW_UPLOAD_MODAL, SHOW_PROMPT_MODAL } from "./types";

export const showUploadModal = (show) => (dispatch) => {
  dispatch({
    type: SHOW_UPLOAD_MODAL,
    payload: show,
  });
};

export const showPromptModal = (show) => (dispatch) => {
  dispatch({
    type: SHOW_PROMPT_MODAL,
    payload: show,
  });
};
