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

    handleLogin = (loggedInUserInfo) => {
        console.log('in handleLogin', loggedInUserInfo);
        // this.setState({
        //     loggedIn: true,
        //     username: loggedInUsername,
        //     userId:   loggedInUserId  
        // })
    }

    render(){

        return(
            <div>
                <User loggedInUser = {this.state} />
                {/* {!this.state.loggedIn ? <AuthenticationGateway handleLogin = {this.handleLogin} /> :
                <User loggedInUser = {this.state}/> }  */}
            </div>
        )
    }
}

export default MainContainer;