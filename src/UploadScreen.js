import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        Hello World!
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}

export default App;