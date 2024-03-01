import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Trash, PencilSquare } from "react-bootstrap-icons";

import "./Context.css";

import {
  getContexts,
  loadContext,
  addContext,
  updateContextDescription,
  deleteContext,
} from "../../actions/context";
import { clearMessages, setMessages } from "../../actions/message";
import { setSystemPrompt } from "../../actions/systemPrompt";
import getSocketInterface from "../../services/socket.service";

const Context = ({
  getContexts,
  loadContext,
  clearMessages,
  setMessages,
  addContext,
  updateContextDescription,
  contexts,
  activeContext,
  deleteContext,
  setSystemPrompt,
}) => {
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [hasFetchedContext, setHasFetchedContext] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const listeners = [
    {
      message: "appendContext",
      action: addContext,
    },
    {
      message: "updateDescription",
      action: updateContextDescription,
    },
  ];

  useEffect(() => {
    if (contexts.length === 0) {
      setIsDeleteMode(false);
    }
  }, [contexts]);

  useEffect(() => {
    if (!hasFetchedContext) {
      getContexts();
    }
    setHasFetchedContext(true);
  }, [hasFetchedContext]);

  useEffect(() => {
    const socketInterface = getSocketInterface(listeners, "context");
    // @ts-ignore
    setSocket(socketInterface);
  }, [socket]);

  const selectContext = (context) => {
    setSystemPrompt(null);
    setMessages(context.messages);
    loadContext(context);

    // if the current route is not /chat, redirect to /chat
    checkRedirect();
  };

  const onDeleteContext = (context) => {
    const isCurrentContext = context._id === activeContext._id;
    deleteContext(context);
    if (isCurrentContext) {
      setSystemPrompt(null);
      clearMessages();
    }
  };

  const newContext = () => {
    loadContext({});
    clearMessages();
    checkRedirect();
  };

  const checkRedirect = () => {
    if (window.location.pathname !== "/chat") {
      console.log("going!");
      return navigate("/chat");
    }
  };

  return (
    <>
      <div className="context-list">
        {contexts.map((context) => (
          <div
            className={`context-item ${
              activeContext._id === context._id ? "active-context-item" : ""
            } ${isDeleteMode ? "delete-mode" : ""}`}
            key={context._id}
            onClick={() =>
              isDeleteMode ? onDeleteContext(context) : selectContext(context)
            }
          >
            {context.description}
          </div>
        ))}
      </div>
      <div className="action-container">
        <div
          className="context-action new-context"
          onClick={() => newContext()}
        >
          <PencilSquare />
        </div>
        {!!contexts.length && (
          <div
            className="context-action clear-context"
            onClick={() => setIsDeleteMode(!isDeleteMode)}
          >
            <Trash />
          </div>
        )}
      </div>
    </>
  );
};

Context.prototypes = {
  contexts: PropTypes.array.isRequired,
  getContexts: PropTypes.func.isRequired,
  loadContext: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  setMessages: PropTypes.func.isRequired,
  addContext: PropTypes.func.isRequired,
  updateContextDescription: PropTypes.func.isRequired,
  activeContext: PropTypes.object.isRequired,
  deleteContext: PropTypes.func.isRequired,
  setSystemPrompt: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contexts: state.context.contexts,
  activeContext: state.context.activeContext,
});

// @ts-ignore
export default connect(mapStateToProps, {
  getContexts,
  loadContext,
  clearMessages,
  setMessages,
  addContext,
  updateContextDescription,
  deleteContext,
  setSystemPrompt,
})(Context);
