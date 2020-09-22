import { UPDATE_ACTIVE_EXERCISE } from "./types.js";

export default function activeReducer(state, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_EXERCISE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
