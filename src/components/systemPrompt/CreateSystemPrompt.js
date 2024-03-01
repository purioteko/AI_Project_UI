import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  createSystemPrompt,
  updateSystemPrompt,
} from "../../actions/systemPrompt";

import { showPromptModal } from "../../actions/modal";

const CreateSystemPrompt = ({
  updateMode = false,
  systemPrompt,
  createSystemPrompt,
  updateSystemPrompt,
  showPromptModal,
}) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (updateMode && systemPrompt) {
      setText(systemPrompt.text);
      setDescription(systemPrompt.description);
    }
  }, [updateMode, systemPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateMode) {
      updateSystemPrompt({
        systemPromptId: systemPrompt._id,
        description,
        text,
      });
    } else {
      createSystemPrompt({
        description,
        text,
      });
    }
    showPromptModal();
  };

  return (
    <div>
      <h2>{updateMode ? "Update System Prompt" : "Create System Prompt"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button type="submit">{updateMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

CreateSystemPrompt.prototype = {
  updateMode: PropTypes.bool,
  systemPrompt: PropTypes.object,
  showPromptModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  systemPrompt: state.systemPrompt.systemPrompt,
});

export default connect(mapStateToProps, {
  createSystemPrompt,
  updateSystemPrompt,
  showPromptModal,
})(CreateSystemPrompt);
