import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Paperclip, Gear } from "react-bootstrap-icons";

import getSocketInterface from "../../services/socket.service";

import "./Chat.css";
import {
  streamReceived,
  appendMessage,
  endStream,
} from "../../actions/message";
import { setActiveContext } from "../../actions/context";
import { showUploadModal, showPromptModal } from "../../actions/modal";
import { Spinner } from "react-bootstrap";

const Chat = ({
  token,
  streamReceived,
  appendMessage,
  setActiveContext,
  endStream,
  messages,
  streamedMessage,
  activeContext,
  showUploadModal,
  showPromptModal,
  systemPrompt,
}) => {
  const activeTextRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const listeners = [
    {
      message: "responseStream",
      action: streamReceived,
    },
    {
      message: "contextSaved",
      action: setActiveContext,
    },
    {
      message: "endStream",
      action: endStream,
    },
  ];

  useEffect(() => {
    const socketInterface = getSocketInterface(listeners, "chat");
    // @ts-ignore
    setSocket(socketInterface);
  }, [socket]);

  useEffect(() => {
    executeScroll();
  }, [activeContext]);

  useEffect(() => {
    executeScroll();
    if (streamedMessage) {
      setIsLoadingResponse(false);
    }
  }, [messages, streamedMessage]);

  const executeScroll = () => {
    if (!activeTextRef || !activeTextRef.current) {
      return;
    }

    // @ts-ignore
    activeTextRef.current.scrollIntoView();
  };

  const handleSendClickStream = async () => {
    try {
      if (inputText.trim() === "") {
        return false;
      }

      // @ts-ignore
      appendMessage({ text: inputText, isUser: true });

      const payload = {
        prompt: inputText,
        contextId: activeContext._id,
        token,
      };

      if (systemPrompt) {
        payload.systemPromptId = systemPrompt._id;
      }

      console.debug(payload);

      // @ts-ignore
      socket.emit("streamingGenerate", payload);
      setIsLoadingResponse(true);

      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAttachmentPressed = () => {
    showUploadModal(true);
  };

  const handlePromptPressed = () => {
    showPromptModal(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendClickStream();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            className={`message ${!!message.isUser ? " user-message" : ""} `}
            key={index}
          >
            {message.isUser ? (
              <>
                <Markdown>{"**User:** " + message.text}</Markdown>
              </>
            ) : (
              <>
                <Markdown>{"**AI:** " + message.text}</Markdown>
              </>
            )}
          </div>
        ))}
        {streamedMessage && (
          <div className="message">
            {<Markdown>{"**AI:** " + streamedMessage}</Markdown>}
          </div>
        )}
        {isLoadingResponse && !streamedMessage && (
          <Spinner animation="grow" variant="" className="chat-loading" />
        )}
      </div>
      <div className="input-container">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button disabled={inputText === ""} onClick={handleSendClickStream}>
          Send
        </button>
        <button onClick={handlePromptPressed}>
          <Gear />
        </button>
        <button onClick={handleAttachmentPressed}>
          <Paperclip />
        </button>
      </div>
      <div ref={activeTextRef}></div>
    </div>
  );
};

Chat.propTypes = {
  streamReceived: PropTypes.func.isRequired,
  appendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  streamedMessage: PropTypes.string.isRequired,
  setActiveContext: PropTypes.func.isRequired,
  endStream: PropTypes.func.isRequired,
  activeContext: PropTypes.object.isRequired,
  showUploadModal: PropTypes.func.isRequired,
  showPromptModal: PropTypes.func.isRequired,
  systemPrompt: PropTypes.object,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  messages: state.message.messages,
  streamedMessage: state.message.streamedMessage,
  activeContext: state.context.activeContext,
  systemPrompt: state.systemPrompt.systemPrompt,
});

// export default Chat;
export default connect(mapStateToProps, {
  streamReceived,
  appendMessage,
  setActiveContext,
  endStream,
  showUploadModal,
  showPromptModal,
})(Chat);
