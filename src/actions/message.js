const {
  MESSAGE_RECEIVED,
  STREAM_RECEIVED,
  MESSAGE_SENT,
  END_STREAM,
  CLEAR_MESSAGES,
  LOAD_MESSAGES,
} = require("./types");

export const endStream = () => (dispatch) => {
  dispatch({
    type: END_STREAM,
  });
};

export const streamReceived = (message) => (dispatch) => {
  console.log("got message", message);
  dispatch({
    type: STREAM_RECEIVED,
    payload: message,
  });
};

export const appendMessage = (message) => (dispatch) => {
  dispatch({
    type: MESSAGE_RECEIVED,
    payload: message,
  });
};

export const streamingGenerate =
  ({ socket, event, payload }) =>
  async (dispatch) => {
    socket.emit(event, payload);
    dispatch({
      type: MESSAGE_SENT,
    });
  };

export const clearMessages = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};

export const setMessages = (messages) => (dispatch) => {
  dispatch({
    type: LOAD_MESSAGES,
    payload: messages,
  });
};
