import React, { Component } from 'react';
import User from '../User';

class MainContainer extends Component {
   
    render(){
       
        return(
            <div>
                <User loggedInUser = {this.props} />
            </div>
        )
    }
}

export default MainContainer;