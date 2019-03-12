import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await fetch("http://localhost:9000/auths/login", {
                method:      'POST',
                credentials: 'include',
                body:        JSON.stringify(this.state),
                headers:{
                    'Content-type': 'application/json'
                }
            });

            if(!loginResponse.ok) {
                throw new Error(loginResponse.statusText);
            } else {
                console.log('Password is wrong');
            }
            const parsedLoginResponse = await loginResponse.json();

            if(parsedLoginResponse.status === 200) {
                this.props.handleLogin.bind(null, parsedLoginResponse.username, parsedLoginResponse.userID);
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username: 
                    <input type="text" name="username" placeholder="Username" onChange={this.handleInput}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" placeholder="Password" onChange={this.handleInput}/>
                </label>
                <input type="Submit" />
            </form>
        )
    }
}

export default Login;