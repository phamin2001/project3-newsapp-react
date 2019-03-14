import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainContainer from '../MainContainer';

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
            const loginResponse = await fetch("http://localhost:9000/auths/login", {
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
                // this.props.handleLogin(parsedLoginResponse.username, parsedLoginResponse.userId);
                this.setState({
                    parsedLoginResponse: [parsedLoginResponse.username, parsedLoginResponse.userId]
                })
            }
        } catch (err) {
            console.log(err);
            return err; 
        }
    }

    // handleRegisterSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const registerResponse = await fetch("http://localhost:9000/users/", {
    //             method:      'POST',
    //             credentials: 'include',
    //             body:        JSON.stringify(this.state),
    //             headers: {
    //                 'Content-type': 'application/json'
    //             }
    //         });

    //         if(!registerResponse.ok) {
    //             throw new Error(registerResponse.statusText);
    //         }

    //         console.log(registerResponse, 'registerResponse');

    //         const parsedRegisterResponse = await registerResponse.json();
    //         console.log(parsedRegisterResponse, 'parsed register');
        
    //     } catch (err) {
    //         console.log(err);
    //         return err;
    //     }
    // }

    render() {
        return(
            <div>
                <form onSubmit={this.handleLoginSubmit}>
                    <h1>Login</h1>
                    <label>
                        Username: 
                        <input type="text" name="username" placeholder="Username" onChange={this.handleInput}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" onChange={this.handleInput}/>
                    </label>
                    <input type="Submit" />
                </form><br/>

                <Route exact
                    path = '/mainContiner' component = {MainContainer}
                    render = { (props) => (<handleLogin
                          loggedInUserInfo = {this.state.parsedLoginResponse}
                    /> )}
                />
                {/* <form onSubmit={this.handleRegisterSubmit}>
                    <h1>Create User</h1>
                    <label>
                        Username: 
                        <input type="text" name="username" placeholder="Username" onChange={this.handleInput}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" onChange={this.handleInput}/>
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
                </form><br/> */}
            </div>
        )
    }
}

export default Login;