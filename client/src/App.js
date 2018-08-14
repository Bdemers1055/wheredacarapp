import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Find from './pages/find';
import Park from './pages/park';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WhereDaCar@App</h1>
        </header>
        <div className="formContainer">
        <Switch>
          <PrivateRoute exact path ="/" component={Home} />
          <Route path ="/login" component={Login} />
          <Route path ="/signup" component={Signup} />
          <PrivateRoute path ="/park" component={Park} />
          <PrivateRoute path ="/find" component={Find} />
          <Redirect to="/" />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
