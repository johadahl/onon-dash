import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from './UploadScreen';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
  }

  render() {
      return (
        <div>
          <MuiThemeProvider>
            <div>
            <p id="status"> </p>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event, newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event, newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
          </MuiThemeProvider>
        </div>
      );
    }

  handleClick(event){
//    var apiBaseUrl = "http://localhost:5000/api/";
    var apiBaseUrl = "https://http://onon-api.herokuapp.com/api/"  // for deployment
    var self = this;
    var payload={
      "email":this.state.username,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
      console.log(response);
      if(response.data.code === 200){
        alert("Success")
        console.log("Login successfull");
        var uploadScreen=[];
        uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
      }
      else{
        console.log("Unsuccessful login");
        document.getElementById("status").innerHTML = "Unsuccessful login, please try again!";
      }
    })
    .catch(function (error) {
    console.log(error);
    });
  }
}

const style = {
  margin: 15,
};
export default Login