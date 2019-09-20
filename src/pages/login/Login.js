import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

import CloseIcon from '@material-ui/icons/Close';

// context
import { useUserDispatch, loginUser, registerUser, resetPassword } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [forgotten, setForgotten] = useState(false);
  var [activeTabId, setActiveTabId] = useState(0);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  // local
  var [notification, setNotification] = useState(false);
  var [notificationMessage, setNotificationMessage] = useState("");

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(false);
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Lost Sales Analytics</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          {!forgotten && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Välkommen!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Logga in nedan
              </Typography>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="E-postadress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Lösenord"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setNotification,
                        setNotificationMessage,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Logga in
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick={() => setForgotten(true)}
                >
                  Glömt lösenord?
                </Button>
              </div>
            </React.Fragment>
          )}
          {forgotten && (
            <React.Fragment>
              <Typography variant="h2" className={classes.greeting}>
                Glömt ditt lösenord?
              </Typography>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Ange din e-postadress"
                type="email"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0
                    }
                    onClick={() =>
                      resetPassword(
                        userDispatch,
                        loginValue,
                        setIsLoading,
                        setNotification,
                        setNotificationMessage,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Skicka
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick={() => setForgotten(false)}
                >
                  Tillbaka
                </Button>
              </div>
            </React.Fragment>
          )}
          </div>
        <Typography color="primary" className={classes.copyright}>
          2019 ONON AB.
        </Typography>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notification}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{notificationMessage}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

    </Grid>
  );
}

export default withRouter(Login);
