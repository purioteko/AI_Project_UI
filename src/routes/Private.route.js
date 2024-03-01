import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = (props) => {
  const {
    component: Component,
    auth: { isAuthenticated, authLoading },
  } = props;

  return (
    <>
      {!isAuthenticated && !authLoading ? (
        <Navigate to="/login" />
      ) : (
        <Component {...props} />
      )}
    </>
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// @ts-ignore
export default connect(mapStateToProps)(PrivateRoute);
