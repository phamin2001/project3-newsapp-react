import React, { Component } from 'react';
import SearchContainer      from '../SearchContainer';

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
            console.log(parsedResponse, 'parsed ' )
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
                <li>
                    {topic.title}
                </li>
            )
        })

        console.log(this.state.searchNews, 'in news')
        return(
            <div>
                <div>
                    <h1>Your Favorite Topics:</h1>
                    {userTopics}
                </div>

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