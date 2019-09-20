import React from "react";
import axios from "axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
//export const apiUrl = "https://onon-api.herokuapp.com";
export const apiUrl = "http://localhost:5000";

export { 
  UserProvider, 
  useUserState, 
  useUserDispatch, 
  loginUser,
  getUserData, 
  resetPassword,
  setNewPassword, 
  changePassword, 
  changeEmail, 
  inviteUser, 
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

// ################### Handles api requests ################

// ################### ACCOUNT SETTINGS 
function loginUser(dispatch, login, password, history, setIsLoading, setNotification, setNotificationMessage) {
  setIsLoading(true);

  // Payload
  const url = apiUrl + "/account/login";
  const payload = {login: login, password: password}

  // Contact api and handle response
  try {
    axios.post(url, payload)
    .then(res => {
      if (res.status === 200) {
        var token = res.data.token;
        localStorage.setItem("id_token", "1");
        localStorage.setItem("jwt_token", token);
        dispatch({ type: "LOGIN_SUCCESS", token:token });
        setNotification(true);
        setNotificationMessage(res.data.message);
        setIsLoading(false);
        history.push("/app/dashboard");
      } 
    })
    .catch(err => {
      setIsLoading(false);
      setNotification(true);
      if (err.response.data.message) {
        setNotificationMessage(err.response.data.message);
      } else {
        setNotificationMessage("Något gick fel")
      }
    })
  } catch (e) {
    console.log(e);
  }
}

// TODO: Backend implementation
function inviteUser (token, type, afnr, name, inviteValue, setNotification, setNotificationMessage, setName, setInviteValue) {
  // Payload
  const url = apiUrl + '/account/invite';
  const payload = {type:type, afnr:afnr, name:name, login:inviteValue}
  const config = {'headers': {'Authorization': 'Bearer ' + token}}

  try {
    axios.post(url, payload, config)
    .then(res => {
      if (res.status === 200) {
        setNotification(true);
        setNotificationMessage(res.data.message);
        setName("");
        setInviteValue("");
      }
    })
    .catch(err => {
      setNotification(true);
      if (err.response.data.message) {
        setNotificationMessage(err.response.data.message);
      } else {
        setNotificationMessage("Något gick fel")
      }
    })
  } catch (e) {
    console.log(e);
  }
}


// Function called from APP_URL/login, Backend will send email to registred user with details on how to reset password
function resetPassword (dispatch, username, setIsLoading, setNotification, setNotificationMessage) {
  console.log("Reset Password");
  setNotification(true);
  setNotificationMessage("Funktion ej tillgänglig");
  setIsLoading(false);
}

// Function called from APP_URL/reset/{generated_token}
function setNewPassword (dispatch, password, setIsLoading, setNotification, setNotificationMessage, path, history) {
  console.log("Set new password");

  // Payload
  const url = apiUrl + '/account/setpw';
  const payload = {token:path.substring(1), password:password}

  try {
    axios.post(url, payload)
    .then(res => {
      if (res.status === 200) {
        setIsLoading(false);
        setNotification(true);
        setNotificationMessage(res.data.message);
        var token = res.data.token;
        localStorage.setItem("id_token", "1");
        localStorage.setItem("jwt_token", token);
        dispatch({ type: "LOGIN_SUCCESS", token:token });
        history.push("/app/dashboard");
      }
    })
    .catch(err => {
      setNotification(true); 
      if (err.response.data.message) {
        setNotificationMessage(err.response.data.message);
      } else {
        setNotificationMessage("Något gick fel")
      }
    })
  } catch (e) {
    console.log(e);
  }
}

function changePassword (token, password, setNotification, setNotificationMessage) {
  console.log("Change Password");

  // Payload
  const url = apiUrl + '/account/changepw';
  const payload = {password:password};
  const config = {'headers': {'Authorization': 'Bearer ' + token}}

  try {
    axios.post(url, payload, config)
    .then(res => {
      if (res.status === 200) {
        setNotification(true);
        setNotificationMessage(res.data.message);
      }
    })
    .catch(err => {
      setNotification(true); 
      if (err.response.data.message) {
        setNotificationMessage(err.response.data.message);
      } else {
        setNotificationMessage("Något gick fel")
      }
    })
  } catch (e) {
    console.log(e);
  }
}

function changeEmail (login, history, setNotification, setNotificationMessage) {
  console.log("Change Email");
  setNotification(true);
  setNotificationMessage("Funktion ej tillgänglig ännu");
}

// ################### DATA API CALLS

// Retrieves user account data
function getUserData (token, setUser) {
  // Payload
  const url = apiUrl + '/api/get_user';
  const payload = {}
  const config = {'headers': {'Authorization': 'Bearer ' + token}}

  try {
    axios.post(url, payload, config)
    .then(res => {
      if (res.status === 200) {
        setUser({data: res.data.data});
      }
    })
  } catch (e) {
    console.log(e);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
