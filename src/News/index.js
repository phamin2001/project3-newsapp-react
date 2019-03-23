import React, { Component } from 'react';
import SearchContainer      from '../SearchContainer';
import { Link }             from 'react-router-dom';

class News extends Component {
    constructor() {
        super();

        this.state = {
            query:      '',
            loading:    true,
            searchNews: []
        }
    }

    handleInput = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.nytimes.com/svc/search/v2//articlesearch.json?q=' + 
                                        this.state.query + '&api-key=Wy2FfqYlhmo4JjtnGKDd5OAHUKE7Jwjf');
            
            if(!response.ok) {
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();
            // console.log(parsedResponse, 'parsed ' )
            this.setState({
                searchNews: parsedResponse,
                loading: false
            })
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    handleChange = async (e) => {
        try {
            const response = await fetch('https://api.nytimes.com/svc/search/v2//articlesearch.json?q=' + 
                                        e.target.value + '&api-key=Wy2FfqYlhmo4JjtnGKDd5OAHUKE7Jwjf');
            
            if(!response.ok) {
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();
            // console.log(parsedResponse, 'parsed ' )
            this.setState({
                searchNews: parsedResponse,
                loading: false
            })
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render(){ 
        const userTopics = this.props.completeUserInfo.loggedInTopics.map((topic, i) => {
            return (
                <option value={topic.title}>
                    {topic.title}
                </option>
            )
        })

        return(
            <div>
                <div><Link to='/user/'>Profile</Link></div>
                
                <label>
                    <h1>Choose One Of Your Favorite Topics:</h1>
                    <select onChange={this.handleChange}>
                        <option>Please Select</option>
                        {userTopics}
                    </select>
                </label>

                <div>
                    <form onSubmit = {this.handleSubmit} >
                        <label>
                            <h2>Search:</h2>
                            <input type = 'text' name = 'query' placeholder = 'What are you intrested?' 
                                            onChange = {this.handleInput} />
                        </label>
                        <button type = 'submit'>Search</button>
                    </form>
                </div>

                <div>
                    {this.state.loading ? <span>Type in the search box</span> : <SearchContainer searchNews = {this.state.searchNews} />}
                </div>
               
            </div>
        )
    }
}

export default News;