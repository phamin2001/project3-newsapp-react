import React, { Component } from 'react';

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

    render(){
        console.log(this.state, 'in alltopic')
        return(
            <div>
                in alltopics
            </div>
        )
    }
}

export default AllTopics;