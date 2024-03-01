import React from "react";
import Chat from "../chat/Chat";
import Context from "../context/Context";

import "./Ai.css";

const Ai = () => {
  return (
    <div className="component-container">
      <div className="child context-container">
        <Context />
      </div>
      <div className="child chat-container">
        <Chat />
      </div>
    </div>
  );
};

export default Ai;
