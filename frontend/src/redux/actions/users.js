import axios from "../../utils/axios";
import { GET_USERS } from "../types";

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
