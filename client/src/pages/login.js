import React, { Component } from 'react';
import auth from '../services/auth';
import '../App.css';

class Login extends Component {
    state = {
        error: null
    }
    async login(e){
        e.preventDefault();
        const form = e.target;
        const inputs = Array.from(form.elements)
                            .filter(element => element.tagName === 'INPUT');
        const [ email, password ] = inputs.map(input => input.value);
        try {
            await auth.login(email, password);
            this.props.history.push({
                pathname: '/'
            });
            
        } catch (error) {
            this.setState({
                error: 'Your username or password is incorrect'
        });
        form.reset();
    }
}
    render() {
      return (
        <form className="loginInputGroup" onSubmit={this.login.bind(this)}>
        {this.state.error ? <p>{this.state.error}</p> : null }
                <input className="email" 
                    type="email"
                    placeholder="first.last@email.com" />
                <input className="password" 
                    type="text"
                    placeholder="password" />
                <button type="submit" className="loginBtn">LOGIN</button>
                <a href="/signup">Sign up</a>
        </form>
      );
    }
};

export default Login;