import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dashboard from './Dashboard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
        <Dashboard />
        <div>
          {this.state.currentScreen}
        </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

