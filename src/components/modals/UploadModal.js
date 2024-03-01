import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FileUploader } from "react-drag-drop-files";

import "./UploadModal.css";
import { showUploadModal } from "../../actions/modal";
import { uploadFile, deleteFile } from "../../actions/file";

const fileTypes = ["TXT", "PDF", "CSV"];

const UploadModal = ({
  showUploadModal,
  uploadFile,
  activeContext,
  deleteFile,
}) => {
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    if (file) {
      setFile(file);
      console.log("file set!");
    }
  };

  const handleClose = () => {
    showUploadModal(false);
  };

  const onSavePressed = () => {
    uploadFile(file, activeContext._id);
    handleClose();
  };

  const onDeletePressed = (fileId) => {
    deleteFile(fileId, activeContext._id);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Upload file</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {activeContext.files &&
            activeContext.files.length > 0 &&
            activeContext.files.map((file) => {
              return (
                <div key={file._id}>
                  <div className="file">
                    <p className="file-name">{file.name}</p>
                    <Button
                      className="delete-button"
                      variant="danger"
                      onClick={() => onDeletePressed(file._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          <FileUploader
            className="file-uploader"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={false}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={!file} onClick={onSavePressed}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

UploadModal.prototypes = {
  showUploadModal: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  activeContext: PropTypes.object.isRequired,
  deleteFile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeContext: state.context.activeContext,
});

// export default Chat;
export default connect(mapStateToProps, {
  showUploadModal,
  uploadFile,
  deleteFile,
})(UploadModal);
