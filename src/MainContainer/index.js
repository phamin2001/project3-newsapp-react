import React, { Component } from 'react';
import Login from '../Login';
import User from '../User';

class MainContainer extends Component {
    constructor(){
        super();

        this.state = {
            loggedIn: false,
            username: '',
            userId: ''
        }
    }

    handleLogin = (loggedInUsername, loggedInUserId) => {
        this.setState({
            loggedIn: true,
            username: loggedInUsername,
            userId:   loggedInUserId  
        })
    }

    render(){

        return(
            <div>
                {!this.state.loggedIn ? <Login handleLogin = {this.handleLogin} /> : <User loggedInUser = {this.state}/> } 
            </div>
        )
    }
}

export default MainContainer;