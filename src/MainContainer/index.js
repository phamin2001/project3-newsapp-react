import React, { Component } from 'react';
import User from '../User';
import AuthenticationGateway from '../AuthenticationGateway';

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
                {!this.state.loggedIn ? <AuthenticationGateway handleLogin = {this.handleLogin} /> :
                <User loggedInUser = {this.state}/> } 
            </div>
        )
    }
}

export default MainContainer;