import React, { Component } from 'react';

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            username:    '',
            password:    '',
            email:       '',
            displayName: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const registerResponse = await fetch('http://localhost:9000/users/', {
                method:      'POST',
                credentials: 'include',
                body:        JSON.stringify(this.state),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!registerResponse.ok) {
                throw new Error(registerResponse.statusText);
            }

            const parsedRegisterResponse = await registerResponse.json();

            if(parsedRegisterResponse.status === 200) {
                this.props.handleLogin(parsedRegisterResponse.username, parsedRegisterResponse.userId);
                this.props.history.push('/user');
            } else {
                alert('Username exists or Credintional is wrong. Try again.');
                this.props.history.push('/');
            }
        
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        return(
            <form onSubmit={this.handleRegisterSubmit}>
                <h1>Create User</h1>
                <label>
                    Username: 
                    <input type='text' name='username' placeholder='Username' onChange={this.handleInput}/>
                </label>
                <label>
                    Password:
                    <input type='password' name='password' placeholder='Password' onChange={this.handleInput}/>
                </label>
                <label>
                    Email:
                    <input type='email' name='email' placeholder='Eamil' onChange={this.handleInput}/>
                </label>
                <label>
                    DisplayName:
                    <input type='text' name='displayname' placeholder='DisplayName' onChange={this.handleInput}/>
                </label>
                <input type='Submit' />
            </form>
        )
    }
}

export default Registration;