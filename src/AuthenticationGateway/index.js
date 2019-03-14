import React, { Component } from 'react';
import Registration from '../Registration';
import Login from '../Login';

class AuthenticationGateway extends Component {
    constructor() {
        super();

        this.state = {
            newUser: '' 
        }
    }

    handleClick = (e) => {
        if(e.target.name === 'login') {
            this.setState({newUser: false})
        } else if(e.target.name === 'register') {
            this.setState({newUser: false})
        }
    }

    render() {

        return(
            <div>
                <div><button name = "login" onClick={this.handleClick}>Login</button></div>
                <div><button name = "register" onClick={this.handleClick}>Create User</button></div>
                {!this.state.newUser ? <Login /> : <Registration />}
            </div>
        )
    }
}

export default AuthenticationGateway;