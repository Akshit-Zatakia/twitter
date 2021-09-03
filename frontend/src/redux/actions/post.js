import axios from "../../utils/axios";
import { GET_ALL_POST, GET_MY_POST, GET_POST } from "../types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cms/post");
    console.log(res.data);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (message) => async (dispatch) => {
  try {
    const res = await axios.post("/api/cms/post", { message }, config);
    console.log(res);

    alert(res.data.message);
  } catch (error) {
    console.log(error);
  }
};

export const getTimelinePost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cms/post/timeline");
    console.log(res.data);
    dispatch({
      type: GET_ALL_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cms/post/me");
    console.log(res.data);
    dispatch({
      type: GET_MY_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
