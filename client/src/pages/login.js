import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
    render() {
      return (
        <div className="loginInputGroup">
                <input className="email" 
                    type="email"
                    placeholder="first.last@email.com" />
                <input className="password" 
                    type="text"
                    placeholder="password" />
                <button type="button" className="loginBtn">LOGIN</button>
                <a href="/signup">Sign up</a>
        </div>
      );
    }
};

export default Login;