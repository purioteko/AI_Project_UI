import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal">AI</h1>
        <p className="lead font-weight-normal">
          AI assistant for your daily life.
        </p>
        <Link to="/register" className="btn btn-secondary">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
      <div className="product-device box-shadow d-none d-md-block"></div>
      <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
    </div>
  );
};

export default Landing;
