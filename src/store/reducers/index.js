import { combineReducers } from "redux";

import auth from "./auth";
import loading from "./loading";
import user from "./user";
import socket from "./socket";
import message from "./message";
import context from "./context";
import modal from "./modal";
import systemPrompt from "./systemPrompt";

export default combineReducers({
  auth,
  loading,
  user,
  socket,
  message,
  context,
  modal,
  systemPrompt,
});
