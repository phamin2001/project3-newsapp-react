import React, { Component } from 'react';
import TopicsList from '../TopicsList';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            topics:   []            
        }
    }

    componentDidMount() {
        this.getUserTopics();
    }

    getUserTopics = async () => {
        try {
            const response = await fetch('http://localhost:9000/users/' + this.props.userId, {
                method:      'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const userParsed = await response.json();
            
            this.setState({
                username: userParsed.user.username,
                topics: userParsed.user.topics
            })            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    deletTopic = (e) => {

    }

    editTopic = (e) => {

    }
 
    render() {       
        return(
            <div>
                <label>
                    <h2>Welcome: {this.state.username}</h2>
                </label><br/>
                <label>
                    <button name = "edit" onClick = {() => this.props.history.push('/user/edit')}>Edit Your Profile</button><br/>
                    <button name = "delete">Delete Your Profile</button><br/>
                </label>
                <label>
                    <h3>All Topics: <TopicsList topics = {this.state.topics} /></h3>
                </label>
            </div>
        )
    }
}

export default User;