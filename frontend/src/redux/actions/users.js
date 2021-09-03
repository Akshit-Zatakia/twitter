import axios from "../../utils/axios";
import { GET_USERS } from "../types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cms/users");
    console.log(res.data);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = (id) => async (dispatch) => {
  try {
    const res = await axios.put("/api/cms/users/follow", { id }, config);
    const { message } = res.data;
    alert(message);
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const unfollow = (id) => async (dispatch) => {
  try {
    const res = await axios.put("/api/cms/users/unfollow", { id }, config);
    const { message } = res.data;
    alert(message);
  } catch (error) {
    alert(error.response.data.message);
  }
};
