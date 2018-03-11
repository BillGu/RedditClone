import React, { Component } from 'react';

//Redux stuff
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

//components
import NavBar from './component/navbar'
import Main from './component/main'

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
	      <div className="App">
	        <NavBar/>
	        <Main/>
	      </div>
      </Provider>
    );
  }
}

export default App;
