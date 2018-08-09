import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/login';

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
        </div>
      </div>
    );
  }
}

export default App;
