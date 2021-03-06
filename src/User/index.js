import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: []
        }
    }

    componentDidMount() {
        this.getUserTopics();
    }

    getUserTopics = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}` + 'users/' + this.props.loggedInUserId, {
                // 'http://localhost:9000/
                method:      'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const userParsed = await response.json();

            this.props.handleCompleteUserInfo(userParsed);
            this.setState({
                topics:      userParsed.userTopics
            })
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    deleteUser = async (e) => {
        try {
            let verify = window.confirm('Are you sure!!');

            if(verify) {
                const deleteUser = await fetch(`${process.env.REACT_APP_BACKEND}` + 'users/' + this.props.loggedInUserId, {
                    // 'http://localhost:9000/
                    method:  'DELETE',
                    credentials: 'include' 
                 });
                 const parsedResponse = await deleteUser.json();
     
                 if(parsedResponse.status === 200) {
                     alert('Sorry! You Delete your profile.');
                     this.props.history.push('/');
                 }
            } else {
                alert('Good Choice!');
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    logOutUser = async (e) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}` + 'auths/logout', {
                // 'http://localhost:9000/
                method:      'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();
            if(parsedResponse.status === 200) {
                this.props.history.push('/');
            }    
        } catch (err) {
            console.log(err);
            return err;            
        }
    }

    handleCurrentTopic = (selectedTopic) => {
        this.props.handleEditedTopic(selectedTopic);
    }

    render() {  
        const userTopicsList = this.state.topics.map((topic, i) => {
            return (
                <li onClick = {this.handleCurrentTopic.bind(null, topic)}>
                    {topic.title}
                </li>
            )
        })

        return(
            <div>
                <label>
                    <h2>Welcome: {this.props.loggedInUsername}</h2>
                </label><br/>
                <label>
                    <button name = 'edit'   onClick = {() => this.props.history.push('/user/edit')} >Edit Your Profile</button><br/>
                </label>
                <label>
                    <button name = 'delete' onClick = {this.deleteUser} >Delete Your Profile</button><br/>
                </label>
                <label>
                    <button name = 'logout' onClick = {this.logOutUser} >Log Out</button><br/>
                </label>
                <label>
                    <h3>All User Topics: <Link to={{pathname: '/user/topic'}}>{userTopicsList}</Link></h3>
                </label>
                <label>
                    <h3><button onClick = {() => this.props.history.push('/user/newtopic')}>Add new Topics</button></h3>
                </label>
                <div>
                    <h2><button onClick = {() => this.props.history.push('/user/news')}>Check Your News</button></h2>
                </div>
            </div>
        )
    }
}

export default withRouter (User);