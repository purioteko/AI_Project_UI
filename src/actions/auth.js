import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  LOADING_START,
  LOADING_END,
} from "./types";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({
        type: LOADING_START,
      });
      const res = await axios.post("/api/user/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch({
        type: LOADING_END,
      });
    } catch (err) {
      dispatch({
        type: LOADING_END,
      });
      const errors = err.response.data.errors;
      if (errors) {
        console.error(errors);
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({
        type: LOADING_START,
      });
      const res = await axios.post("/api/auth/login", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch({
        type: LOADING_END,
      });
    } catch (err) {
      dispatch({
        type: LOADING_END,
      });
      const errors = err.response.data.errors;
      if (errors) {
        console.error(errors);
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({
      type: LOADING_START,
    });
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch({
      type: LOADING_END,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({
      type: LOADING_END,
    });
  }
};
