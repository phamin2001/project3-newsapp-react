import React, { Component } from 'react';
import Registration from '../Registration';
import Login from '../Login';

class AuthenticationGateway extends Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         newUser: '' 
    //     }
    // }

    handleClick = (e) => {
        if(e.target.name === 'login') {
            this.props.history.push('/login');
        } else if(e.target.name === 'register') {
            this.props.history.push('/register');
        }
    }

    render() {

        return(
            <div>
                <label>
                    <h1>Welcome to News App</h1>
                    <h2>Please Login or Create Your Profile:</h2>
                </label>
                <div><button name = "login" onClick={this.handleClick}>Login</button></div>
                <div><button name = "register" onClick={this.handleClick}>Create User</button></div>
                {/* {!this.state.newUser ? <Login /> : <Registration />} */}
            </div>
        )
    }
}

export default AuthenticationGateway;


  // if(e.target.name === 'login') {
        //     this.setState({newUser: false})
        // } else if(e.target.name === 'register') {
        //     this.setState({newUser: false})
        // }