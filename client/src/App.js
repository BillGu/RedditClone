import React, { Component } from 'react';

//Redux stuff
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

//components
import NavBar from './component/navbar'
import Main from './component/main'
import TopicAddition from './component/addTopic'
import NotificationContainer from './component/notification';

//routing
import { Router, Route, Link } from 'react-router-dom'
import history from './history';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
	      <div className="App">
	        <NavBar/>
          <Router history={history}>
             <div id="wrap">
               <Route exact path="/" component={Main} />
               <Route path="/topic" component={TopicAddition} />
             </div>
          </Router>
          <NotificationContainer/>
	      </div>
      </Provider>
    );
  }
}

export default App;
