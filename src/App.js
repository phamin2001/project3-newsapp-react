import React, { Component } from 'react';
import './App.css';
import AuthenticationGateway from './AuthenticationGateway';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import Registration from './Registration';


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <MainContainer />
//       </div>
//     )
//   }
// }

const My404 = () => {
  return (
    <div>
      You are lost!!!
    </div>
  )
}

const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path = "/"         component = { AuthenticationGateway } />
        <Route exact path = "/login"    component = { Login } />
        <Route exant path = "/register" component = { Registration } />
        <Route component={ My404 }/>
      </Switch>
    </main>
  )
}

export default App;
