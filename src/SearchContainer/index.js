import React from 'react';

const SearchContainer = (props) => {

    const newsLists = props.searchNews.response.docs.map((doc, i) => {
        return(
            <ui key = {i}>
                <section>
                    {doc.headline.main} <br/>
                </section>
            </ui>
        )
    });

    return (
        <div>
            <h2>Your News:</h2>
            {newsLists}
        </div>
    )
}

export default SearchContainer;