import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
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
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">WhereDaCar@App</h1>
        </header>
        <div className="formContainer">
        <Login />
        <Signup />
        <Home />
        <Find />
        <Park />
        </div>
      </div>
    );
  }
}

export default App;
