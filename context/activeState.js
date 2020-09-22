import activeContext from "./activeContext";
import { UPDATE_ACTIVE_EXERCISE } from "./types";
import React, { useReducer } from "react";
import activeReducer from "./activeReducer";
export default function activeState(props) {
  const initState = null;

  const [state, dispatch] = useReducer(activeReducer, initState);

  //actions
  const updateActiveExercise = (snapshot) => {
    dispatch({
      type: UPDATE_ACTIVE_EXERCISE,
      payload: snapshot,
    });
  };

  return (
    <activeContext.Provider
      value={{
        snapshot: state,
        updateActiveExercise,
      }}
    >
      {props.children}
    </activeContext.Provider>
  );
}
