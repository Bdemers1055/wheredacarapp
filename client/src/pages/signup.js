import React, { Component } from 'react';
import auth from '../services/auth';
import '../App.css';

class Signup extends Component {
        state = {
            error: null
        }
        async signup(e){
            e.preventDefault();
            const form = e.target;
            const inputs = Array.from(form.elements)
                                .filter(element => element.tagName === 'INPUT');
            const [ email, password ] = inputs.map(input => input.value);
            try {
                await auth.signup(email, password);
                this.props.history.push({
                    pathname: '/login'
                });
                
            } catch (error) {
                this.setState({
                    error: 'try again'
            });
            form.reset();
        }
    }
    render() {
      return (
        <form className="SignupInputGroup" onSubmit={this.signup.bind(this)}>
        {this.state.error ? <p>{this.state.error}</p> : null }
                <input className="email" 
                    type="email"
                    placeholder="first.last@email.com" />
                <input className="password" 
                    type="text"
                    placeholder="password" />
                <button type="submit" className="loginBtn">SIGNUP</button>
                <p>Already have an account?<a href="/login"> Login</a></p>
        </form>
      );
    }
};

export default Signup;