import React, { Component } from 'react';
import './App.css';
import AuthenticationGateway from './AuthenticationGateway';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import Registration from './Registration';
import MainContainer from './MainContainer';
import EditUser from './EditUser';

const My404 = () => {
  return (
    <div>
      You are lost!!!
    </div>
  )
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      userId:   ''
    }
  }

  handleLogin = (loggedInUsername, loggedInUserId) => {
    this.setState({
      username: loggedInUsername,
      userId:   loggedInUserId
    })
  }

  render(){
    return (
      <main>
        <Switch>
          <Route exact path = "/"         component     = { AuthenticationGateway } />
          <Route exact path = "/login"    
                       render = { (props) => ( <Login {...props}
                       handleLogin = {this.handleLogin} />)} />
          <Route exant path = "/register" 
                       render = { (props) => ( <Registration {...props}
                       handleLogin = {this.handleLogin} />)} />
          <Route exact path = "/userInfo"
                      render = { (props) => ( <MainContainer {...props}
                      loggedInUserInfo = {this.state} /> )} />
          <Route exact path = "/user/edit"     component     = { EditUser } />
          <Route component={ My404 }/>
        </Switch>
      </main> 
    )
  }
}

export default App;
