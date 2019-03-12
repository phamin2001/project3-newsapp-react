import React, { Component } from 'react';
import Login from '../Login';
import Registration from '../Registration';

class MainContainer extends Component {
    constructor(){
        super();

        this.state = {
            loggedIn: false
        }
    }

    handleLogin = () => {

    }

    render(){

        return(
            <div>
                {this.state.loggedIn ? <Registration loggedIn = {this.state.loggedIn} /> : 
                                       <Login handleLogin = {this.handleLogin} />} 
            </div>
        )
    }
}

export default MainContainer;