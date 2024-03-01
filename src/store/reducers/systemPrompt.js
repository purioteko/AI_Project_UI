import { SET_SYSTEM_PROMPT, SET_SYSTEM_PROMPTS } from "../../actions/types";

const initialState = {
  systemPrompt: undefined,
  systemPrompts: [],
};

const systemPromptReducer = (state = initialState, action) => {
  const { type, payload } = action;

  console.log(type, payload);

  switch (type) {
    case SET_SYSTEM_PROMPT:
      return {
        ...state,
        systemPrompt: payload,
      };
    case SET_SYSTEM_PROMPTS:
      return {
        ...state,
        systemPrompts: payload,
      };
    default:
      return state;
  }
};

export default systemPromptReducer;
