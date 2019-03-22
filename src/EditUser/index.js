import React,{ Component } from 'react';
import { Link }            from 'react-router-dom';

class Edit extends Component {
    constructor() {
        super();

        this.state = {
            username:    '',
            email:       '',
            displayName: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditSubmit =  async (e) => {
        e.preventDefault();

        try {
            const editResponse = await fetch('http://localhost:9000/users/' + this.props.loggedInUserId, {
                method:      'PUT',
                credentials: 'include',
                body:        JSON.stringify(this.state),
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if(!editResponse.ok) {
                throw ErrorEvent(editResponse.statusText)
            } 

            const editParseUser = await editResponse.json();
            if(editParseUser.status === 200) {
                this.props.handleCompleteUserInfo(editParseUser);
                this.props.history.push('/user');
    
            } else if(editParseUser.status === 400) {
                alert('User aleready exists or Username field is empty enter different username.');
            }
        } catch (err) {
            console.log(err);
            return err;            
        }
    }


    render() {
        return(
            <div>
                <div><Link to='/user/'>Profile</Link></div>
                <form onSubmit={this.handleEditSubmit}>
                    <h1>Edit User</h1>
                    <label>
                        Username: 
                        <input type='text' name='username' placeholder= {this.props.completeUserInfo.loggedInUsername} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Email:
                        <input type='email' name='email' placeholder= {this.props.completeUserInfo.loggedInEmail} onChange={this.handleInput}/>
                    </label>
                    <label>
                        DisplayName:
                        <input type='text' name='displayname' placeholder= {this.props.completeUserInfo.loggedInDisplayName} onChange={this.handleInput}/>
                    </label>
                    <input type='Submit' />
                </form>
            </div>
        )
    }



}

export default Edit;