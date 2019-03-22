import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import TopicsList           from '../TopicsList';

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
            const response = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId, {
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
                const deleteUser = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId, {
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

    render() {  
        return(
            <div>
                <label>
                    <h2>Welcome: {this.props.loggedInUsername}</h2>
                </label><br/>
                <label>
                    <button name = 'edit' onClick = {() => this.props.history.push('/user/edit')} >Edit Your Profile</button><br/>
                    {/* <Link to='/user/edit'>Edit Your Profile</Link> */}
                </label>
                <label>
                    <button name = 'delete' onClick = {this.deleteUser} >Delete Your Profile</button><br/>
                </label>
                <label>
                    <h3>All User Topics: <TopicsList topics = {this.state.topics} /></h3>
                </label>
                <label>
                    <h3><button onClick = {() => this.props.history.push('/user/newtopic')}>Add new Topics</button></h3>
                </label>
            </div>
        )
    }
}

export default withRouter (User);