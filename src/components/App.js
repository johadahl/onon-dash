import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import Reset from "../pages/reset";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  var { token } = useUserState();

  // TODO: Handle user authentification
  // const [user, setUser] = useState({fname: "", lname:"", afnr:""})

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/reset" component={Reset} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route {...rest} render={props => {
        if (isAuthenticated) {
          return <Component {...props} token={token}/>
        }
        else {
          return <Redirect to={{ pathname: "/login", state: {from: props.location } }} />
        }
      }}/>
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
