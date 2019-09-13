import React, { useState }from "react";
import { 
  Grid,
  TextField,
  Typography,
  Fade,
  CircularProgress,
  Button,
  Snackbar,
  IconButton,
 } from "@material-ui/core";

// styles
import useStyles from "./styles";
import CloseIcon from '@material-ui/icons/Close';


// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";

// context
import { useUserDispatch, changeEmail, changePassword, inviteFriend } from "../../context/UserContext";


export default function Settings(props) {
  var classes = useStyles();

// global
  var userDispatch = useUserDispatch();

// local
  var [notification, setNotification] = useState(false);
  var [notificationMessage, setNotificationMessage] = useState("");

  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [passwordCheckValue, setPasswordCheckValue] = useState("");
  var [inviteValue, setInviteValue] = useState("");

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(false);
  }

  return (
    <>
      <PageTitle title="Inställningar" />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Widget title="Kontoinställningar" upperTitle disableWidgetMenu>
            <Typography variant="h6" className={classes.greeting}>
              Ändra e-postadress
            </Typography>
            Ändra e-postadressen som används för att logga in.
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
              placeholder={"Nuvarande:" + props.user.email}
              type="email"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                disabled={loginValue.length === 0}
                onClick={() =>
                  changeEmail(
                    userDispatch,
                    loginValue,
                    props.history,
                    setNotification,
                    setNotificationMessage
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Spara
              </Button>
            </div>
            <Typography variant="h6" className={classes.greeting}>
              Byt lösenord:
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
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordCheckValue}
              onChange={e => setPasswordCheckValue(e.target.value)}
              margin="normal"
              placeholder="Upprepa lösenordet"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                disabled={
                  passwordValue.length === 0 ||
                  passwordCheckValue !== passwordValue
                }
                onClick={() =>
                  changePassword(
                    userDispatch,
                    passwordValue,
                    props.history,
                    setNotification,
                    setNotificationMessage,
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Spara
              </Button>
            </div>
            </Widget>
          </Grid>

          <Grid item xs={6}>
            <Widget title="Övrigt" upperTitle disableWidgetMenu>
            <Typography variant="h6" className={classes.greeting}>
              Bjud in kollega:
            </Typography>
            Bjud in en kollega till tjänsten genom att ange säljarens e-postadress nedan:
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={inviteValue}
              onChange={e => setInviteValue(e.target.value)}
              margin="normal"
              placeholder="Ange en e-postadress"
              type="email"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                disabled={inviteValue.length === 0}
                onClick={() =>
                  inviteFriend(
                    userDispatch,
                    inviteValue,
                    props.history,
                    setNotification,
                    setNotificationMessage
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Skicka
              </Button>
            </div>
            <Typography variant="h6" className={classes.greeting}>
              Någon mer inställning?
            </Typography>
            --tillfällig text--
            </Widget>
        </Grid>

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
    </>
  );
}
