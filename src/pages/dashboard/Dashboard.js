import React, { useState, useEffect } from "react";

import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import Sales from "./components/Sales";
import Ceo from "./components/Ceo";
import President from "./components/President";
import Admin from "./components/Admin";



export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <>
      {props.user.data.type === "sales" && (
        <React.Fragment>
          <Sales user={props.user}/>
        </React.Fragment>
      )}
      {props.user.data.type === "ceo" && (
        <React.Fragment>
          <Ceo user={props.user}/>
        </React.Fragment>
      )}
      {props.user.data.type === "president" && (
        <React.Fragment>
          <President user={props.user}/>
        </React.Fragment>
      )}
      {props.user.data.type === "admin" && (
        <React.Fragment>
          <Admin user={props.user}/>
        </React.Fragment>
      )}
    </>
  );
}

                