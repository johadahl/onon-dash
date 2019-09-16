import React from "react";
import axios from "axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
export const apiUrl = "https://onon-api.herokuapp.com";
//export const apiUrl = "http://localhost:5000";

export { 
  UserProvider, 
  useUserState, 
  useUserDispatch, 
  loginUser,
  registerUser,
  getUserData, 
  resetPassword, 
  changePassword, 
  changeEmail, 
  inviteFriend, 
  signOut };

// ############### Authentification handling and routing ################
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, token: action.token }; // Possibly remove token
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, token: null };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    token: localStorage.getItem("jwt_token")
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

// ################### Handles login and api requests ################

function registerUser(dispatch, login, password, history, setIsLoading, setError) {

  setIsLoading(true);
  const url = apiUrl + "/api/register";
  
  try {
    axios.post(url, {login: login, password: password})
    .then(res => {
      if (res.status === 200) {
        var token = res.data.token;
        localStorage.setItem("id_token", "1");
        localStorage.setItem("jwt_token", token);
        dispatch({ type: "LOGIN_SUCCESS", token:token });      // Possibly remove token
        setIsLoading(false);
        history.push("/app/dashboard");
      } else {
        setIsLoading(false);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  // Payload
  const url = apiUrl + "/api/login";

  // Contact api and handle response
  try {
    axios.post(url, {login: login, password: password})
    .then(res => {
      if (res.status === 200) {
        var token = res.data.token;
        localStorage.setItem("id_token", "1");
        localStorage.setItem("jwt_token", token);
        dispatch({ type: "LOGIN_SUCCESS", token:token });      // Possibly remove token
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

function getUserData (token, setData, setUser) {
  const url = apiUrl + '/api/get_user';

  try {
    axios.post(url, {token:token})
    .then(res => {
      if (res.status === 200) {
        setUser(res.data);
      }
    })
  } catch (e) {
    console.log(e);
  }
}


// TODO - Check if email is stored in database
// If stored in db, send reset link else error
function resetPassword (dispatch, login, history, setNotification, setNotificationMessage) {
  console.log(login);
  setNotification(true);
}

function changePassword (dispatch, password, history, setNotification, setNotificationMessage) {
  console.log("Change Password");
  setNotificationMessage("Lösenord uppdaterat");
  setNotification(true);
}

function changeEmail (dispatch, login, history, setNotification, setNotificationMessage) {
  console.log("Change Email");
  setNotificationMessage("E-postadress ändrad");
  setNotification(true);
}

function inviteFriend (dispatch, login, history, setNotification, setNotificationMessage) {
  console.log("Change Email");
  setNotificationMessage("Inbjudan skickad");
  setNotification(true);
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
