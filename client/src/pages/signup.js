import React, { Component } from 'react';
import '../App.css';

class Signup extends Component {
    render() {
      return (
        <div className="SignupInputGroup">
                <input className="email" 
                    type="email"
                    placeholder="first.last@email.com" />
                <input className="password" 
                    type="text"
                    placeholder="password" />
                <button type="button" className="loginBtn">SIGNUP</button>
        </div>
      );
    }
};

export default Signup;