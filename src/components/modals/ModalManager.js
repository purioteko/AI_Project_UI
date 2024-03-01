import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UploadModal from "./UploadModal";
import SystemPromptModal from "./SystemPromptModal";

const ModalManager = ({ uploadModalEnabled, promptModalEnabled }) => {
  return (
    <div>
      {uploadModalEnabled && <UploadModal />}
      {promptModalEnabled && <SystemPromptModal />}
    </div>
  );
};

ModalManager.prototypes = {
  uploadModalEnabled: PropTypes.bool.isRequired,
  promptModalEnabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  uploadModalEnabled: state.modal.uploadModalEnabled,
  promptModalEnabled: state.modal.promptModalEnabled,
});

// @ts-ignore
export default connect(mapStateToProps, {})(ModalManager);
