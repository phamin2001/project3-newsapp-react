import React,{ Component } from 'react';

class Edit extends Component {

    render() {
        console.log(this.props.location.state.userInfo, 'in edit')
        return(
            <form onSubmit={this.handleRegisterSubmit}>
            <h1>Create User</h1>
            <label>
                Username: 
                <input type="text" name="username" placeholder= {this.props.location.state.userInfo.username} onChange={this.handleInput}/>
            </label>
            <label>
                Email:
                <input type="email" name="email" placeholder="Eamil" onChange={this.handleInput}/>
            </label>
            <label>
                DisplayName:
                <input type="text" name="displayname" placeholder="DisplayName" onChange={this.handleInput}/>
            </label>
            <input type="Submit" />
        </form>
        )
    }



}

export default Edit;