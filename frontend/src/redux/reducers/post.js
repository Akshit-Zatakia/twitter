import { GET_ALL_POST, GET_MY_POST, GET_POST } from "../types";

const initialState = {
  posts: [],
  all: [],
  my: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return {
        ...state,
        posts: payload,
      };
    case GET_ALL_POST:
      return {
        ...state,
        all: payload,
      };
    case GET_MY_POST:
      return {
        ...state,
        my: payload,
      };
    default:
      return state;
  }
}
