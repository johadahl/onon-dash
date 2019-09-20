import React, { useState } from "react";
import {withRouter} from 'react-router';


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

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

import CloseIcon from '@material-ui/icons/Close';

// context
import { useUserDispatch, setNewPassword } from "../../context/UserContext";

export default function Reset(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [passwordValue, setPasswordValue] = useState("");
  var [passwordConfirmValue, setPasswordConfirmValue] = useState("");

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
          <Typography variant="h2" className={classes.greeting}>
            Återställ lösenord
          </Typography>
          <Typography variant="h3" className={classes.subGreeting}>
            Skapa ett nytt lösenord nedan
          </Typography>
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
          <TextField
            id="passwordConfirm"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={passwordConfirmValue}
            onChange={e => setPasswordConfirmValue(e.target.value)}
            margin="normal"
            placeholder="Upprepa lösenord"
            type="password"
            fullWidth
          />
          <div className={classes.formButtons}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  passwordValue.length === 0 || 
                  passwordValue !== passwordConfirmValue 
                }
                onClick={() =>
                  setNewPassword(
                    userDispatch,
                    passwordValue,
                    setIsLoading,
                    setNotification,
                    setNotificationMessage,
                    props.location.search,
                    props.history,
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Återställ
              </Button>
            )}
          </div>
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