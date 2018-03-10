import React, { Component } from 'react';

import NavBar from './component/navbar'
import Main from './component/main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Main/>
      </div>
    );
  }
}

export default App;
