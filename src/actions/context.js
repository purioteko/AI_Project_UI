import axios from "axios";

const {
  SET_ACTIVE_CONTEXT,
  SET_CONTEXTS,
  LOAD_CONTEXT,
  ADD_CONTEXT,
  UPDATE_CONTEXT,
  DELETE_CONTEXT,
  LOADING_START,
  LOADING_END,
} = require("./types");

export const setActiveContext = (context) => (dispatch) => {
  console.log("context is being set");
  dispatch({
    type: SET_ACTIVE_CONTEXT,
    payload: context,
  });
};

export const getContexts = () => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    console.log("getting contexts");
    const response = await axios.get("/api/ai/contextList");
    const contexts = response.data;

    dispatch({
      type: SET_CONTEXTS,
      payload: contexts,
    });
  } catch (error) {
    console.error("Error fetching contexts:", error);
  }
  dispatch({
    type: LOADING_END,
  });
};

export const clearContexts = () => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    console.log("clearing contexts");
    await axios.get("/api/ai/clearContexts");

    dispatch({
      type: SET_CONTEXTS,
      payload: [],
    });
  } catch (error) {
    console.error("Error clearing contexts:", error);
  }
  dispatch({
    type: LOADING_END,
  });
};

export const loadContext = (context) => async (dispatch) => {
  try {
    console.log("loading context");
    dispatch({
      type: LOAD_CONTEXT,
      payload: context,
    });
  } catch (error) {
    console.error("Error loading context:", error);
  }
};

export const addContext = (context) => async (dispatch) => {
  try {
    console.log("adding context");
    dispatch({
      type: ADD_CONTEXT,
      payload: context,
    });
  } catch (error) {
    console.error("Error adding context:", error);
  }
};

export const updateContextDescription = (context) => async (dispatch) => {
  try {
    console.log("updating context description");
    dispatch({
      type: UPDATE_CONTEXT,
      payload: context,
    });
  } catch (error) {
    console.error("Error updating context description:", error);
  }
};

export const deleteContext = (context) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    console.log("deleting context");
    try {
      await axios.delete(`/api/ai/deleteContext/${context._id}`);
      dispatch({
        type: DELETE_CONTEXT,
        payload: context,
      });
    } catch (err) {
      console.error(err.message);
    }
  } catch (error) {
    console.error("Error deleting context:", error);
  }
  dispatch({
    type: LOADING_END,
  });
};
