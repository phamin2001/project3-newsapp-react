import './App.css';
import React, { Component }  from 'react';
import { Route, Switch }     from 'react-router-dom';
import User                  from './User';
import AuthenticationGateway from './AuthenticationGateway';
import Login                 from './Login';
import EditUser              from './EditUser';
import Registration          from './Registration';
import NewTopic              from './NewTopic';
import Topic                 from './Topic';
import EditTopic             from './EditTopic';

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
      userId:   '',
      completeUserInfo: {
        loggedInUsername:   '',
        loggedInEmail:      '',
        loggedInDiplayName: ''
      },
      editedTopic: {}
    }
  }

  handleLogin = (loggedInUsername, loggedInUserId) => {
    this.setState({
      username: loggedInUsername,
      userId:   loggedInUserId
    })
  }

  handleCompleteUserInfo = (userParsed) => {
    if(userParsed.username != this.username) {
      this.setState({username: userParsed.username});
    }

    this.setState({
      completeUserInfo: {
        loggedInUsername:    userParsed.username,
        loggedInEmail:       userParsed.userEmail,
        logeedInDisplayName: userParsed.userDisplayName
      }
    });
  }

  handleEditedTopic = (topic) => {
    this.setState({
      editedTopic: topic
    })
  }

  render(){
    return (
      <main>
        <Switch>
          <Route exact path        = '/'         component     = { AuthenticationGateway } />
          <Route exact path        = '/login'    
                       render      = { (props) => ( <Login {...props}
                       handleLogin = {this.handleLogin} />)} 
          />
          <Route exant path        = '/register'
                       render      = { (props) => ( <Registration {...props}
                       handleLogin = {this.handleLogin} /> )} 
          />
          <Route exact path                     = '/user'
                       render                   = { (props) => ( <User {...props}
                       loggedInUsername         = {this.state.username} 
                       loggedInUserId           = {this.state.userId}
                       handleCompleteUserInfo   = {this.handleCompleteUserInfo} /> )} 
          />
          <Route exact path                   = '/user/edit'
                       render                 = { (props) => ( <EditUser {...props}
                       loggedInUserId         = {this.state.userId}
                       completeUserInfo       = {this.state.completeUserInfo} 
                       handleCompleteUserInfo = {this.handleCompleteUserInfo}  /> )}
          />
          <Route exact path           = '/user/newtopic'
                       render         = { (props) => ( <NewTopic {...props}
                       loggedInUserId = {this.state.userId} /> )} 
          />
          <Route exact path              = '/user/topic'       
                       render            = { (props) => ( <Topic {...props}
                       handleEditedTopic = {this.handleEditedTopic}
                       editedTopic       = {this.state.editedTopic}
                       loggedInUserId    = {this.state.userId} /> )} 
          />
          <Route exact path              = '/user/edittopic'   
                       render            = { (props) => ( <EditTopic {...props}
                       editedTopic       = {this.state.editedTopic}
                       loggedInUserId    = {this.state.userId}  /> )} 
          />
          <Route component={ My404 }/>
        </Switch>
      </main> 
    )
  }
}

export default App;
