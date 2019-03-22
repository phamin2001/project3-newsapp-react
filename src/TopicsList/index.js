// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// const TopicsList = (props) => {


//     const topicsList = props.topics.map((topic, i) => {
//         return(
//             <li key={i}>
//                 <Link to={{
//                     pathname: '/user/topic',
//                     state: 
//                         {topicId:     topic._id,
//                          topicTitle:  topic.title,
//                          topicWriter: topic.writer,
//                          topicDate:   topic.data
//                     }
//                 }}>{topic.title}</Link>
//             </li>
//         )
//     })

//     if(topicsList.length === 0) {
//         return(
//             <div><h4>There is no topic</h4></div>
//         )
//     } else {
//         return(
//             <div>{topicsList}</div>
            
//         )
//     }
// }

// export default TopicsList;