import React, { Component } from 'react';
import AllTopics            from '../AllTopics';
import { Link }             from 'react-router-dom';


class NewTopic extends Component {
    constructor(){
        super();

        this.state = {
            title:   'title',
            writer:  'writer',
            date:    ''
        }
    }

    handleSelectedTopic = async (id) => {
    
        try {
            const selectedTopicResponse = await fetch('http://localhost:9000/api/v1/topics/' + id, {
                method: 'GET',
                credentials: 'include'
            });

            if(!selectedTopicResponse.ok) {
                throw Error(selectedTopicResponse.statusText);
            }

            const parsedSelectedTopicREsponse = await selectedTopicResponse.json();
            this.setState({
                title:  parsedSelectedTopicREsponse.topic.title,
                writer: parsedSelectedTopicREsponse.topic.writer,
                date:   parsedSelectedTopicREsponse.topic.date
            })

            
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
        console.log(this.props.loggedInUserId, 'in handleNewTopic: loggedUseid')
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
            this.props.history.push('/user');         
        
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        return(
            <div>
               <div><Link to='/user/'>Profile</Link></div>
               <div>
                    <h2>All topics:  <AllTopics handleSelectedTopic = {this.handleSelectedTopic}/></h2>
               </div>
               <form onSubmit={this.handleNewTopicSubmit}>
                    <h1>New Topic</h1>
                    <label>
                        Title: 
                        <input type='text' name='title' placeholder={this.state.title} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Writer:
                        <input type='text' name='writer' placeholder={this.state.writer} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Date:
                        <input type='date' name='date'  placeholder={this.state.date} onChange={this.handleInput}/>
                    </label>
                    <input type='Submit' />
                </form><br/>
            </div>
        )
    }
}

export default NewTopic;