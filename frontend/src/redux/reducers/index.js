import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import users from "./users";

export default combineReducers({
  auth,
  post,
  users,
});
