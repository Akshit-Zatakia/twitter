import axios from "../../utils/axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_lOADED,
} from "../types";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/cms/auth");
    console.log(res);
    dispatch({
      type: USER_lOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Reister user

export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username,
      email,
      password,
    });

    console.log(body);
    try {
      const res = await axios.post("/api/o/users", body, config);

      const { message, error } = res.data;
      console.log(error);
      if (error) {
        alert(message);
      } else {
        alert(message);
      }
    } catch (e) {
      const { message, error } = e.response.data;
      if (error) {
        alert(message);
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login user

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });

    console.log(body);
    try {
      const res = await axios.post("/api/o/users/login", body, config);
      const { message, error } = res.data;
      if (error) {
        alert(message);
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
