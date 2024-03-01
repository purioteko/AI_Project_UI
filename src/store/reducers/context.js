import {
  SET_ACTIVE_CONTEXT,
  SET_CONTEXTS,
  LOAD_CONTEXT,
  ADD_CONTEXT,
  UPDATE_CONTEXT,
  DELETE_CONTEXT,
  ADD_CONTEXT_AND_SET,
  REMOVE_FILE_FROM_CONTEXT,
} from "../../actions/types";

const initialState = {
  activeContext: {},
  contexts: [],
};

const contextReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_FILE_FROM_CONTEXT:
      const { fileId, contextId } = payload;
      return {
        ...state,
        activeContext:
          state.activeContext._id === contextId
            ? {
                ...state.activeContext,
                files: state.activeContext.files.filter(
                  (file) => file._id !== fileId
                ),
              }
            : state.activeContext,
        contexts: state.contexts.map((context) =>
          // @ts-ignore
          context._id === contextId
            ? {
                // @ts-ignore
                ...context,
                // @ts-ignore
                files: context.files.filter((file) => file._id !== fileId),
              }
            : context
        ),
      };
    case ADD_CONTEXT_AND_SET:
      // @ts-ignore
      if (state.activeContext._id === payload._id) {
        return state;
      }
      return {
        ...state,
        contexts: [
          payload,
          // @ts-ignore
          ...state.contexts.filter((c) => c._id !== payload._id),
        ],
        activeContext: payload,
      };
    case DELETE_CONTEXT:
      return {
        ...state,
        contexts: state.contexts.filter(
          // @ts-ignore
          (context) => context._id !== payload._id
        ),
        activeContext:
          // @ts-ignore
          state.activeContext._id === payload._id ? {} : state.activeContext,
      };
    case UPDATE_CONTEXT:
      return {
        ...state,
        contexts: state.contexts.map((context) =>
          // @ts-ignore
          context._id === payload._id
            ? // @ts-ignore
              { ...context, description: payload.description }
            : context
        ),
      };
    case ADD_CONTEXT:
      return {
        ...state,
        contexts: [
          payload,
          // @ts-ignore
          ...state.contexts.filter((c) => c._id !== payload._id),
        ],
        activeContext: payload,
      };
    case LOAD_CONTEXT:
      return {
        ...state,
        activeContext: payload,
      };
    case SET_ACTIVE_CONTEXT:
      return {
        ...state,
        activeContext: payload,
        contexts: [payload, ...state.contexts],
      };
    case SET_CONTEXTS:
      return {
        ...state,
        contexts: payload,
      };
    default:
      return state;
  }
};

export default contextReducer;
