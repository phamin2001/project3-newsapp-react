import React, { Component } from 'react';
import AllTopics            from '../AllTopics';


class NewTopic extends Component {
    constructor(){
        super();

        this.state = {
            title:   '',
            writer:  '',
            date:    '',
            topicId: ''
        }
    }

    handleSelectedTopic = (id) => {
        this.setState({
            topicId: id
        })
    }

    componentDidMount() {
        // console.log('in componentDidlMount')
        if(this.state.topicId) {
            // console.log('after if')
            this.getSelectedTopic();
        }
    }

    getSelectedTopic = async () => {
        try {
            const selectedTopicResponse = await fetch('http://localhost:9000/api/v1/topics/' + this.state.topicId, {
                method: 'GET',
                credentials: 'include'
            });

            if(!selectedTopicResponse.ok) {
                throw Error(selectedTopicResponse.statusText);
            }

            const parsedSelectedTopicREsponse = await selectedTopicResponse.json();
            console.log(parsedSelectedTopicREsponse, 'parsed topic in NewTopic')
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleNewTopicSubmit = async (e) => {
        e.preventDefault();

        try {
            const newTopicResponse = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId + '/topics/', {
                method: 'POST',
                credentials: 'include',
                body:        JSON.stringify(this.state),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!newTopicResponse.ok) {
                throw Error(newTopicResponse.statusText);
            }

            const parsedNewTopicResponse = await newTopicResponse.json();
            // console.log(parsedNewTopicResponse, 'parsed newTopic'); 
            this.props.history.push('/user');         
        
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        // const id = this.props.location.state.topidId;
        // console.log(this.props.location.state.topicId,'coming from alltopic')
        console.log(this.state.topicId, 'topic Id in newtopic')

        return(
            <div>
               <div>
                    <h2>All topics:  <AllTopics handleSelectedTopic = {this.handleSelectedTopic}/></h2>
               </div>
               <form onSubmit={this.handleNewTopicSubmit}>
                    <h1>New Topic</h1>
                    <label>
                        Title: 
                        <input type='text' name='title' placeholder='title' onChange={this.handleInput}/>
                    </label>
                    <label>
                        Writer:
                        <input type='text' name='writer' placeholder='writer' onChange={this.handleInput}/>
                    </label>
                    <label>
                        Date:
                        <input type='date' name='date'  onChange={this.handleInput}/>
                    </label>
                    <input type='Submit' />
                </form><br/>
            </div>
        )
    }
}

export default NewTopic;