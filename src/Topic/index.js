import React, { Component } from 'react';

class Topic extends Component {
    // constructor() {
    //     super();

    //     this.stae = {
    //         title: '',
    //         writer: '',
    //         date: ''
    //     }
    // }

    // handleInput = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    // handleEditSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const 
        
    //     } catch (err) {
    //         console.log(err);
    //         return err;
    //     }
    // }

    deleteTopic = async (e) => {

    }

  
    render() {
        return(
            <div>
                <h1>Topic: {this.props.location.state.topicTitle}</h1>
                <div><button name = 'edit'    onClick={() => this.props.history.push('/user/edittopic')}>Edit Topic</button></div>
                <div><button name = 'delete'  onClick={this.deleteTopic}>Delete Topic</button></div>
            </div>
            // <form onSubmit={this.handleEditSubmit}>
            //     <h1>Topic: {this.props.location.state.topicTitle}</h1>
            //     <label>
            //         Title: 
            //         <input type='text' name='title' placeholder= {this.props.location.state.topicTitle} onChange={this.handleInput}/>
            //     </label>
            //     <label>
            //         Writer:
            //         <input type='text' name='writer' placeholder= {this.props.location.state.topicWriter} onChange={this.handleInput}/>
            //     </label>
            //     <label>
            //         Date of Publish:
            //         <input type='text' name='date' placeholder= {this.props.location.state.topicDate} onChange={this.handleInput}/>
            //     </label>
            //     <input type='Submit' />
            // </form>
        )
    }
}

export default Topic;