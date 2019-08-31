import React from "react";
import axios from "axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
//export const apiUrl = "http://localhost:5000";
export const apiUrl = "https://onon-api.herokuapp.com";


function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, resetPassword, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setIsLoading(true);

  // Payload
  const url = apiUrl + "/api/login";

  // Contact api and handle response
  try {
    const response = axios.post(url, {login: login, password: password})
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        console.log("If clause passed")
        localStorage.setItem("id_token", "1");
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);
        history.push("/app/dashboard");
      } else {
        setError(true);
        setIsLoading(false);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

// TODO - Check if email is stored in database
// If stored in db, send reset link
// else error
function resetPassword (dispatch, login, history, setIsLoading, setError) {
  console.log(login);
  setError(true);
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
