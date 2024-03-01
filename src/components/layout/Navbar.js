import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = ({
  auth: { isAuthenticated, user },
  loading: { isLoading },
  logout,
}) => {
  const authLinks = (
    <>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/chat">
            Chat
          </Link>
        </li>
        <li className="nav-item mobile-nav-item">
          <Link className="nav-link" to="/history">
            History
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        {user ? (
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              {`${user.name} `}
            </Link>
          </li>
        ) : (
          <></>
        )}
        <li className="nav-item">
          <a className="nav-link" onClick={logout} href="#!">
            Logout
          </a>
        </li>
      </ul>
    </>
  );

  const guestLinks = (
    <>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        AI
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!isLoading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
});

// @ts-ignore
export default connect(mapStateToProps, { logout })(Navbar);
