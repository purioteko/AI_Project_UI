import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Loader.css";

const Loader = ({ loading: { isLoading } }) => {
  return isLoading ? (
    <div className="spinner-container">
      <div
        className="spinner-border"
        style={{ width: "6rem", height: "6rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <></>
  );
};

Loader.propTypes = {
  loading: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

// @ts-ignore
export default connect(mapStateToProps, {})(Loader);
