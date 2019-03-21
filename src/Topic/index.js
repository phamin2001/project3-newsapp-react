import React, { Component } from 'react';
import { throws } from 'assert';

class Topic extends Component {
    constructor() {
        super();

        this.state = {
            title:  '',
            writer: '',
            date:   '',
            id:     ''
        }
    }

    componentDidMount = () => {
        this.getTopic();
    }

    getTopic = async () => {
        console.log(this.props.location.state.topicId, 'in getTopic, location');
        console.log(this.props.editedTopic._id, 'in getTopic, editedTopic.id')
        try {
            const response = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId + '/topics/' +
                                    this.props.editedTopic._id ? this.props.editedTopic._id : this.props.location.state.topicId , {
                method:      'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const parsedTopicResponse = await response.json();
            console.log(parsedTopicResponse, 'parsed topic')
            this.setState({
                title:  parsedTopicResponse.topic.title,
                writer: parsedTopicResponse.topic.writer,
                date:   parsedTopicResponse.topic.date,
                id:     parsedTopicResponse.topic._id
            })

            this.props.handleEditedTopic(parsedTopicResponse.topic);

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    deleteTopic = async (e) => {
        try {
            const deletedTopicResponse = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId + '/topics/' + this.state.id, {
                method:      'DELETE',
                credentials: 'include'
            })

            if(!deletedTopicResponse.ok) {
                throw Error(deletedTopicResponse.statusText);
            }

            const parsedDeletedTopic = await deletedTopicResponse.json();

            if(parsedDeletedTopic.status === 200) {
                alert('You delete a topic');
                this.props.history.push('/user');
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        return(
            <div>
                <h1>Topic: {this.state.title}</h1>
                <label>
                    <h2>Writer: {this.state.writer}</h2>
                </label>
                <label>
                    <h2>Date of Publish: {this.state.date}</h2>
                </label>
                <div><button name='edit' onClick={() => this.props.history.push('/user/edittopic')}>Edit</button></div>
                <div><button name='delete' onClick={this.deleteTopic}>Delete</button></div>
            </div>
        )
    }
}

export default Topic;