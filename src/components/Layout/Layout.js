import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { apiUrl } from "../../context/UserContext"

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Af from "../../pages/af";
import Sales from "../../pages/sales";
import Settings from "../../pages/settings";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { getUserData} from "../../context/UserContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  const [data, setData] = useState({data: [], isFetching: false});
  const [user, setUser] = useState({fname: "", lname:"", afnr:""})

  // TODO: This api call should be done as a service
  useEffect(() => {
    getUserData(props.token, setData, setUser);
/*    const fetchUser = async () => {
      try {
        const user = await axios.get( apiUrl + '/api/get_user');
        setUser(user.data);
      } catch (e) {
        console.log(e);
      setData({data: data.users, isFetching: false});
      }
    };
    fetchUser();
  }, 
*/
  
  }, []);


  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} user={user}/>
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            {props.token}
            <Switch>
              <Route path="/app/dashboard" render={(props) => <Dashboard {...props} user={user} />}/>
              <Route path="/app/af" component={Af} />
              <Route path="/app/sales" component={Sales} />
              <Route path="/app/settings" render={(props) => <Settings {...props} user={user} />}/>
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
