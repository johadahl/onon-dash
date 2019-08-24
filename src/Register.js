import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      password_check:''
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <p id="status"> </p>
          <TextField
            hintText="Enter your First Name"
            floatingLabelText="First Name"
            onChange = {(event,newValue) => this.setState({first_name:newValue})}
            />
          <br/>
          <TextField
            hintText="Enter your Last Name"
            floatingLabelText="Last Name"
            onChange = {(event,newValue) => this.setState({last_name:newValue})}
            />
          <br/>
          <TextField
            hintText="Enter your Email"
            type="email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({email:newValue})}
            />
          <br/>
          <TextField
            type = "password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
            />
          <br/>
          <TextField
            type = "password"
            hintText="Repeat Password"
            floatingLabelText="Repeat Password"
            onChange = {(event,newValue) => this.setState({password_check:newValue})}
            />
          <br/>
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  };
  handleClick(event){
    var apiBaseUrl = "http://localhost:5000/api/";
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password, this.state.password_check);
    if (this.state.first_name === ''){
      document.getElementById("status").innerHTML = "Please enter a first name";
    }
    else if (this.state.last_name === ''){
      document.getElementById("status").innerHTML = "Please enter a last name";
    }
    else if (this.state.email === ''){
      document.getElementById("status").innerHTML = "Please enter an email";
    }
    else if (this.state.password === ''){
      document.getElementById("status").innerHTML = "Please enter a password";
    }
    if (this.state.password !== this.state.password_check){
      document.getElementById("status").innerHTML = "Password is not a match. Try again!";
    }

    var self = this;
    var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'/register', payload)
   .then(function (response) {
      console.log(response);
      if(response.data.code === 200){
        console.log("registration successfull");
        alert("registration successfull");
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this}/>);
        var loginmessage = "Not Registered yet. Go to registration";
        self.props.parentContext.setState({loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
        });
      }
      else if(response.data.code === 204){
        // Catch cases if the email is not in the database
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

export default Register;