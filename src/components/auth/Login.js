import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import "./Auth.css";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="form-container text-center">
      <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
      <form className="form-component" onSubmit={(e) => onSubmit(e)}>
        <input
          type="email"
          className="form-control"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          minLength={6}
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button
          type="submit"
          className="btn btn-lg btn-primary btn-block action-btn"
        >
          Login
        </button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// @ts-ignore
export default connect(mapStateToProps, { login })(Login);
