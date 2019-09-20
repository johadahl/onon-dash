import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  Lock as LogOutIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";

import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Tooltip title="Huvudmeny">
          <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButton,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              <ArrowBackIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>
        </Tooltip>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Volkswagen Group Sweden - Lost Sales Analytics
        </Typography>
        <div className={classes.grow} />
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          {props.user.data.name}
        </Typography>
        <Tooltip title="Logga ut">
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={() => signOut(userDispatch, props.history)}
          >
            <LogOutIcon classes={{ root: classes.headerIcon }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
