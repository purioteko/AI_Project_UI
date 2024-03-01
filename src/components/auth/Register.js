import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import "./Auth.css";
import { register } from "../../actions/auth";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.error("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="form-container text-center">
      <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
      <form className="form-component" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
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
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          name="password2"
          minLength={6}
          value={password2}
          onChange={(e) => onChange(e)}
        />
        <button
          type="submit"
          className="btn btn-lg btn-primary btn-block action-btn"
        >
          Register
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// @ts-ignore
export default connect(mapStateToProps, { register })(Register);
