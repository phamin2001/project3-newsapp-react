import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TopicsList from '../TopicsList';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:   '',
            email:      '',
            diplayName: '',
            topics:     []            
        }
    }

    componentDidMount() {
        this.getUserTopics();
    }

    getUserTopics = async () => {
        try {
            const response = await fetch('http://localhost:9000/users/' + this.props.userInfo.userId, {
                method:      'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const userParsed = await response.json();
            
            this.setState({
                username:    userParsed.user.username,
                email:       userParsed.user.email,
                displayName: userParsed.user.displayName,
                topics:      userParsed.user.topics
            })            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    deleteUser = async (e) => {
        try {
            const deleteUser = await fetch('http://localhost:9000/users/' + this.props.userInfo.userId, {
               method:  'DELETE',
               credentials: 'include' 
            });
            const parsedResponse = await deleteUser.json();

            if(parsedResponse.status === 200) {
                alert('Sorry! You Delete your profile.');
                this.props.history.push('/');
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {      
        return(
            <div>
                <label>
                    <h2>Welcome: {this.state.username}</h2>
                </label><br/>
                <label>
                    <button name = "edit" onClick = {() => this.props.history.push({
                                                     pathname: '/user/edit', 
                                                     state: {userInfo: this.state}
                                                     })
                                                    } > Edit Your Profile</button><br/>
                    <button name = "delete" onClick = {this.deleteUser} >Delete Your Profile</button><br/>
                </label>
                <label>
                    <h3>All Topics: <TopicsList topics = {this.state.topics} /></h3>
                </label>
            </div>
        )
    }
}

export default withRouter (User);