import React, { Component } from 'react';
import TopicsList from '../TopicsList';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
            userId: props.loggedInUser.userId
        }
    }

    componentDidMount() {
        this.getUserTopics();
    }

    getUserTopics = async () => {
        
        try {
            const response = await fetch('http://localhost:9000/users/' + this.state.userId, {
                method:      'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const userParsed = await response.json();
            console.log(userParsed, 'parsed topic')
            
            this.setState({
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
        console.log(this.state.topics, 'in user')
       
        return(
            <div>
                <label>
                    Welcome: {this.props.loggedInUser.username}
                </label><br/>
                <label>
                    All Topics: <TopicsList topics = {this.state.topics} />
                </label>
            </div>
        )
    }
}

export default User;