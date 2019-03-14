import React, { Component } from 'react';
import User from '../User';

const TopicsList = (props) => {

    const topicsList = props.topics.map((topic, i) => {
        return(
            <li key={i}><a href="#">{topic.title}</a>
            
            {/* <button onClick={props.deleteTopic.bind(null, i)}>Delete</button>
            <button onClick={props.editTopic.bind(null, i)}>Edit</button> */}
            </li>
        )
    })

    return (
        <div>
            {topicsList}
        </div>
    )
}

export default TopicsList;