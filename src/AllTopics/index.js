import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class AllTopics extends Component {
    constructor() {
        super();

        this.state = {
            allTopics: []
        }
    }

    componentDidMount() {
        this.getAllTopics();
    }

    getAllTopics = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/v1/topics/', {
                method:      'GET',
                credentials: 'include',
            });

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const parsedResponce = await response.json();
            this.setState({
                allTopics: parsedResponce.data
            })
            
        } catch (err) {
            console.log(err);
            return err;            
        }
    }

    handleChange = (e) => {
        this.props.handleSelectedTopic(e.target.value);
        // this.props.history.push({
        //                 pathname: '/user/newtopic'});
    }

    render(){
        const allTopicsList = this.state.allTopics.map((topic, i) => {
            return (
                <option value={topic._id}>
                    {topic.title}
                </option>
            )
        });
   
        return(
            <div>
                <select onChange={this.handleChange}>
                    <option>Plese Select</option>
                    {allTopicsList}
                </select>
            </div>
        )
    }
}

export default withRouter (AllTopics);