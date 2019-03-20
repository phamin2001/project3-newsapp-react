import React, { Component } from 'react';

class NewTopic extends Component {
    constructor(){
        super();

        this.state = {
            title:  '',
            writer: '',
            date:   ''
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
        return(
            <div>
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