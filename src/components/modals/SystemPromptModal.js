import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

import "./SystemPromptModal.css";

import {
  getSystemPrompts,
  setSystemPrompt,
  deleteSystemPrompt,
} from "../../actions/systemPrompt";
import { showPromptModal } from "../../actions/modal";

import CreateSystemPrompt from "../systemPrompt/CreateSystemPrompt";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const SystemPromptModal = ({
  getSystemPrompts,
  deleteSystemPrompt,
  systemPrompt,
  systemPrompts,
  showPromptModal,
  setSystemPrompt,
}) => {
  const [createMode, setCreateMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    getSystemPrompts();
  }, [getSystemPrompts]);

  const handleClose = () => {
    showPromptModal(false);
  };

  const onDeletePressed = (promptId) => {
    console.log("delete ", promptId);
    // deleteFile(fileId, activeContext._id);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>System Prompts</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!createMode && !updateMode && (
            <Button
              onClick={() => {
                setCreateMode(true);
              }}
            >
              Create new prompt
            </Button>
          )}

          {!createMode && !updateMode && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {systemPrompts.map((prompt, index) => (
                    <tr
                      key={index}
                      className={
                        systemPrompt && prompt._id === systemPrompt._id
                          ? "selected"
                          : ""
                      }
                    >
                      <td>{prompt.description}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setSystemPrompt(prompt);
                            showPromptModal(false);
                          }}
                        >
                          Select
                        </Button>
                        <Button
                          onClick={() => {
                            setSystemPrompt(prompt);
                            setUpdateMode(true);
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            deleteSystemPrompt(prompt._id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {createMode && <CreateSystemPrompt updateMode={false} />}
          {updateMode && <CreateSystemPrompt updateMode={true} />}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute" }}
    >
      <h2 className="modal-header">System Prompts</h2>
      <div className="modal-body">
        <button
          className="create-prompt-button"
          onClick={() => {
            setCreateMode(true);
          }}
        >
          Create new prompt
        </button>

        {createMode && <CreateSystemPrompt updateMode={false} />}
        {updateMode && <CreateSystemPrompt updateMode={true} />}

        {!createMode && !updateMode && (
          <table className="prompt-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {systemPrompts.map((prompt, index) => (
                <tr key={index}>
                  <td>{prompt.description}</td>
                  <td>{prompt.text}</td>
                  <td>
                    <button
                      className="update-prompt-button"
                      onClick={() => {
                        setSystemPrompt(prompt);
                        setUpdateMode(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-prompt-button"
                      onClick={() => {
                        deleteSystemPrompt(prompt._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

SystemPromptModal.prototype = {
  getSystemPrompts: PropTypes.func.isRequired,
  deleteSystemPrompt: PropTypes.func.isRequired,
  systemPrompts: PropTypes.array.isRequired,
  showPromptModal: PropTypes.func.isRequired,
  systemPrompt: PropTypes.object.isRequired,
  setSystemPrompt: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  systemPrompts: state.systemPrompt.systemPrompts,
  systemPrompt: state.systemPrompt.systemPrompt,
});

export default connect(mapStateToProps, {
  getSystemPrompts,
  deleteSystemPrompt,
  showPromptModal,
  setSystemPrompt,
})(SystemPromptModal);
