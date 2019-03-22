import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class EditTopic extends Component {
    constructor() {
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

    handleEditTopic = async (e) => {
        e.preventDefault();

        try {
            const editResponse = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId + '/topics/' + this.props.editedTopic._id, {
                method:      'PUT',
                credentials: 'include',
                body:        JSON.stringify(this.state),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!editResponse.ok) {
                throw Error(editResponse.statusText)
            }

            const parsedEditResponse = await editResponse.json();
            this.props.handleEditedTopic(parsedEditResponse.updatedTopic);
            this.props.history.push('/user/topic');

        } catch (err) {
            console.log(err);
            return err;            
        }
    }

    render() {
        return(
            <div>
                <div><Link to='/user/topic'>Profile</Link></div>
                <form onSubmit={this.handleEditTopic}>
                    <h1>Edit Topic: </h1>
                    <label>
                        Title: 
                        <input type='text' name='title' placeholder={this.props.editedTopic.title} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Writer:
                        <input type='text' name='writer' placeholder={this.props.editedTopic.writer} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Date of Publish:
                        <input type='text' name='date' placeholder={this.props.editedTopic.date} onChange={this.handleInput}/>
                    </label>
                    <input type='Submit' />
                </form>
            </div>
        )
    }
}

export default EditTopic;