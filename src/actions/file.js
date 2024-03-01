import axios from "axios";

import {
  LOADING_START,
  LOADING_END,
  ADD_CONTEXT_AND_SET,
  REMOVE_FILE_FROM_CONTEXT,
} from "./types";

export const uploadFile = (file, contextId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  if (contextId) {
    formData.append("contextId", contextId);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    dispatch({
      type: LOADING_START,
    });
    const response = await axios.post("/api/file/upload", formData, config);
    dispatch({
      type: ADD_CONTEXT_AND_SET,
      payload: response.data.context,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(errors);
    }
  }
  dispatch({
    type: LOADING_END,
  });
};

export const deleteFile = (fileId, contextId) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });
    await axios.delete(`/api/file/${fileId}`);
    dispatch({
      type: REMOVE_FILE_FROM_CONTEXT,
      payload: { fileId, contextId },
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(errors);
    }
  }
  dispatch({
    type: LOADING_END,
  });
};
