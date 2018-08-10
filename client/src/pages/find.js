import React, { Component } from 'react';
import '../App.css';
import Map from '../components/map';


class Find extends Component {
    render() {
      return (
        <div className="mapContainer">
        <Map />
                <button type="button" className="loginBtn"><a href="/home">UNPARK</a></button>
        </div>
      );
    }
};

export default Find;