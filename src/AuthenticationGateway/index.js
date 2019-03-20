import React, { Component } from 'react';

class AuthenticationGateway extends Component {

    render() {

        return(
            <div>
                <label>
                    <h1>Welcome to News App</h1>
                    <h2>Please Login or Create Your Profile:</h2>
                </label>
                <div><button name = 'login'    onClick={() => this.props.history.push('/login')}>Login</button></div>
                <div><button name = 'register' onClick={() => this.props.history.push('register')}>Create User</button></div>
            </div>
        )
    }
}

export default AuthenticationGateway;