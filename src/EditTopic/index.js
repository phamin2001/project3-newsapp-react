import React, { Component } from 'react';

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
            const editResponse = await fetch('http://localhost:9000/users' + usrid + '/topics/' + this.props.editedTopic._id, {
                
            })
            
        } catch (err) {
            console.log(err);
            return err;            
        }
    }

    render() {
        return(
            <div>
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