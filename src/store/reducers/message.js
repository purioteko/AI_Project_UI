import {
  MESSAGE_RECEIVED,
  STREAM_RECEIVED,
  END_STREAM,
  CLEAR_MESSAGES,
  LOAD_MESSAGES,
} from "../../actions/types";

const initialState = {
  streamedMessage: "",
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
        streamedMessage: "",
      };
    case STREAM_RECEIVED:
      return {
        ...state,
        streamedMessage: `${state.streamedMessage}${payload.text}`,
      };
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case END_STREAM:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            text: state.streamedMessage,
            isUser: false,
          },
        ],
        streamedMessage: "",
      };
    default:
      return state;
  }
};

export default messageReducer;
