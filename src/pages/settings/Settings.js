import React, { useState }from "react";
import { 
  Grid,
  TextField,
  Typography,
  Button,
  Snackbar,
  IconButton,
  Popper,
  Fade,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
 } from "@material-ui/core";

// styles
import useStyles from "./styles";
import {
  Close as CloseIcon,
  Info as InfoIcon,
} from '@material-ui/icons';

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";

// context
import { useUserState, changeEmail, changePassword, inviteUser } from "../../context/UserContext";


export default function Settings(props) {
  var classes = useStyles();
  var token = useUserState().token;

// local general
  var [notification, setNotification] = useState(false);
  var [notificationMessage, setNotificationMessage] = useState("");
// local for invite
  var [type, setType] = useState("sales");
  var [afnr, setAfnr] = useState([]);
  var [name, setName] = useState("");
  var [inviteValue, setInviteValue] = useState("");
// local, used for account settings
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [passwordCheckValue, setPasswordCheckValue] = useState("");

//local, for account type information popper
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

// Handles account type information
  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

// Handles snackbar
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
          <Widget title="Lägg till användare" upperTitle disableWidgetMenu>
            Bjud in en användare i tjänsten genom att ange uppgifterna nedan.
            <span>
              <IconButton
                aria-haspopup="true"
                aria-describedby={id}
                color="inherit"
                className={classes.headerMenuButton}
                aria-controls="profile-menu"
                onClick={handleClick}
                variant="contained"
              >
                <InfoIcon />
              </IconButton>
              <Popper id={id} open={open} anchorEl={anchorEl} transition placement="right-start">
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper className={classes.paper}>
                      <Typography>
                        <b>Säljare</b> kan bjuda in andra säljare vid samma återförsäljare. 
                        <br/> En säljare kan se resultat kopplad till sig själv, samt viss data gemensam för alla vid samma ÅF.
                        {["admin", "president", "ceo"].includes(props.user.data.type) && (
                          <React.Fragment>
                            <br/><br/><b>ÅF-Chef</b> kan bjuda in ÅF-Chefer samt säljare anställda vid samma återförsäljare som sig själv. 
                            <br/> En ÅF-Chef kan se alla resultat för alla säljare vid samma ÅF.
                          </React.Fragment>
                        )}
                        {["admin", "president"].includes(props.user.data.type) && (
                          <React.Fragment>
                            <br/><br/><b>Koncernchef</b> kan bjuda in Koncernchefer, ÅF-Chefer samt Säljare anställda inom koncernen. 
                            <br/> En Koncernchef kan se resultat för alla återförsäljare inom koncernen 
                          </React.Fragment>
                        )}
                        {["admin"].includes(props.user.data.type) && (
                          <React.Fragment>
                            <br/><br/><b>Administatör</b> kan skapa alla typer av användare. 
                            <br/> En Administratör kan se all data från alla säljare och återförsäljare.
                          </React.Fragment>
                        )}
                        </Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </span>
            <br/>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type">Användartyp</InputLabel>
              {props.user.data.type === "sales" && (
                <React.Fragment>
                  <Select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField, width:'100px'}}}
                    children={[
                      <MenuItem value={"sales"}>Säljare</MenuItem>,
                      ]}             
                  >
                  </Select>
                </React.Fragment>
              )}
              {props.user.data.type === "ceo" && (
                <React.Fragment>
                  <Select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField, width:'100px'}}}
                    children={[
                      <MenuItem value={"sales"}>Säljare</MenuItem>,
                      <MenuItem value={"ceo"}>ÅF-Chef</MenuItem>,
                      ]}             
                  >
                  </Select>
                </React.Fragment>
              )}
              {props.user.data.type === "president" && (
                <React.Fragment>
                  <Select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField, width:'100px'}}}
                    children={[
                      <MenuItem value={"sales"}>Säljare</MenuItem>,
                      <MenuItem value={"ceo"}>ÅF-Chef</MenuItem>,
                      <MenuItem value={"president"}>Koncernchef</MenuItem>,
                      ]}             
                  >
                  </Select>
                </React.Fragment>
              )}
              {props.user.data.type === "admin" && (
                <React.Fragment>
                  <Select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField, width:'100px'}}}
                    children={[
                      <MenuItem value={"sales"}>Säljare</MenuItem>,
                      <MenuItem value={"ceo"}>ÅF-Chef</MenuItem>,
                      <MenuItem value={"president"}>Koncernchef</MenuItem>,
                      <MenuItem value={"admin"}>Administratör</MenuItem>,
                      ]}             
                  >
                  </Select>
                </React.Fragment>
              )}
            </FormControl>

            {["admin", "president"].includes(props.user.data.type) && (
              <React.Fragment>
                <TextField
                  id="afnr"
                  InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField}}}
                  value={afnr}
                  onChange={e => setAfnr(e.target.value)}
                  margin="normal"
                  placeholder="ÅF nummer (ange flera separerat med , )"
                  type="text"
                  fullWidth
                />
              </React.Fragment>
            )}
            {["ceo", "sales"].includes(props.user.data.type) && (
              <React.Fragment>
                <TextField
                  id="afnr"
                  InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField}}}
                  value={props.user.data.afnr}
                  margin="normal"
                  type="text"
                  fullWidth
                />
              </React.Fragment>
            )}

            <TextField
              id="name"
              InputProps={{classes: { underline: classes.textFieldUnderline, input: classes.textField}}}
              value={name}
              onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="För- & efternamn"
              type="text"
              fullWidth
            />
            <TextField
              id="login"
              InputProps={{classes: {underline: classes.textFieldUnderline, input: classes.textField}}}
              value={inviteValue}
              onChange={e => setInviteValue(e.target.value)}
              margin="normal"
              placeholder="E-postadress"
              type="email"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                disabled={
                  inviteValue.length === 0 ||
                  name.length === 0}
                onClick={() =>
                  inviteUser(
                    token,
                    type,
                    afnr,
                    name,
                    inviteValue,
                    setNotification,
                    setNotificationMessage,
                    setName,
                    setInviteValue,
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
              Skicka
              </Button>
            </div>
          </Widget>
        </Grid>

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
              placeholder={"Nuvarande:" + props.user.data.login}
              type="email"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                disabled={loginValue.length === 0}
                onClick={() =>
                  changeEmail(
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
              id="passwordConfirm"
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
                    token,
                    passwordValue,
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
