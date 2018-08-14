import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Find from './pages/find';
import Park from './pages/park';
// import Redirect from '../node_modules/react-router-dom/Redirect';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WhereDaCar@App</h1>
        </header>
        <div className="formContainer">
        <Switch>
          <Route exact path ="/" component={Home} />
          <Route path ="/login" component={Login} />
          <Route path ="/signup" component={Signup} />
          <Route path ="/park" component={Park} />
          <Route path ="/find" component={Find} />
          <Redirect to="/" />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
