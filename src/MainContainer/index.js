import React, { Component } from 'react';
import User from '../User';

class MainContainer extends Component {
   
    render(){
        return(
            <div>
                <User userInfo = {this.props.loggedInUserInfo} />
            </div>
        )
    }
}

export default MainContainer;