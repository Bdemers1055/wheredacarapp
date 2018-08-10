import React, { Component } from 'react';
import '../App.css';

class Home extends Component {
    render() {
      return (
        <div className="SignupInputGroup">
                <button type="button" className="loginBtn"><a href="/park">PARK</a></button>
                <button type="button" className="loginBtn outlined"><a href="/find">FIND</a></button>
        </div>
      );
    }
};

export default Home;