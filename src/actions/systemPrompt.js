import axios from "axios";

const {
  SET_SYSTEM_PROMPT,
  SET_SYSTEM_PROMPTS,
  LOADING_START,
  LOADING_END,
} = require("./types");

export const setSystemPrompt = (prompt) => (dispatch) => {
  dispatch({
    type: SET_SYSTEM_PROMPT,
    payload: prompt,
  });
};

export const getSystemPrompts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/ai/systemPrompts");
    const prompts = response.data;

    dispatch({
      type: SET_SYSTEM_PROMPTS,
      payload: prompts,
    });
  } catch (error) {
    console.error("Error fetching system prompts:", error);
  }
};

export const createSystemPrompt = (prompt) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });

    const body = JSON.stringify(prompt);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/ai/createSystemPrompt", body, config);

    if (res.data.systemPrompt) {
      dispatch({
        type: SET_SYSTEM_PROMPT,
        payload: res.data.systemPrompt,
      });
    }

    await getSystemPrompts()(dispatch);
  } catch (error) {
    console.error("Error clearing system prompts:", error);
  }

  dispatch({
    type: LOADING_END,
  });
};

export const deleteSystemPrompt = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });

    await axios.delete(`/api/ai/deleteSystemPrompt/${id}`);

    await getSystemPrompts()(dispatch);
  } catch (error) {
    console.error("Error clearing system prompts:", error);
  }

  dispatch({
    type: LOADING_END,
  });
};

export const updateSystemPrompt = (prompt) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });

    const body = JSON.stringify(prompt);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/ai/updateSystemPrompt`, body, config);

    if (res.data.systemPrompt) {
      dispatch({
        type: SET_SYSTEM_PROMPT,
        payload: res.data.systemPrompt,
      });
    }

    await getSystemPrompts()(dispatch);
  } catch (error) {
    console.error("Error clearing system prompts:", error);
  }

  dispatch({
    type: LOADING_END,
  });
};
