import React from "react";
import SearchForm from "../components/SearchForm";
import TweetList from "../components/TweetList";
import axios from "axios";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            tweets: [],
            meta: {},
        };
    }

    onSubmitSearchQuery = (query) => {
        const apiUrl = `http://localhost:8080/api/tweets/search?keyword=${query}`;
        axios.get(apiUrl).then((res) => {
            this.setState({
                tweets: res.data.data,
                meta: res.data.meta,
            });
        });
    };

    render() {
        return (
            <div>
                <SearchForm onSubmitSearchQuery={this.onSubmitSearchQuery} />
                <TweetList tweets={this.state.tweets} />
            </div>
        );
    }
}

export default HomePage;
