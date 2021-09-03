import { GET_USERS } from "../types";

const initialState = {
  all: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        all: payload,
      };

    default:
      return state;
  }
}
