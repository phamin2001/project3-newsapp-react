import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username:    '',
            password:    '',
            parsedLoginResponse: []
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await fetch('http://localhost:9000/auths/login', {
                method:      'POST',
                credentials: 'include',
                body:        JSON.stringify(this.state),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!loginResponse.ok) {
                throw new Error(loginResponse.statusText);
            }

            const parsedLoginResponse = await loginResponse.json();

            if(parsedLoginResponse.status === 200) {
                this.props.handleLogin(parsedLoginResponse.username, parsedLoginResponse.userId);
                this.props.history.push('/user');
            } else {
                alert('Something wrong, try again.');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            return err; 
        }
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleLoginSubmit}>
                    <h1>Login</h1>
                    <label>
                        Username: 
                        <input type='text' name='username' placeholder='Username' onChange={this.handleInput}/>
                    </label>
                    <label>
                        Password:
                        <input type='password' name='password' placeholder='Password' onChange={this.handleInput}/>
                    </label>
                    <input type='Submit' />
                </form><br/>
            </div>
        )
    }
}

export default Login;