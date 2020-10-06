import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addTweets, clearTweets } from "../actions/TweetsActions";
import { clearMeta, setMeta } from "../actions/MetaActions";

class RecentSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            searchOption: "keyword",
        };
    }

    onSubmitSearchQuery = (e) => {
        this.props.dispatch(clearTweets());
        this.props.dispatch(clearMeta());
        e.preventDefault();
        var apiUrl = `http://localhost:8080/api/tweets/search?keyword=`;
        if (this.state.searchOption === "phrase") {
            apiUrl = apiUrl.concat(`"${this.state.query}"`);
        } else if (this.state.searchOption !== "keyword") {
            apiUrl = apiUrl.concat(
                `${this.state.searchOption}${this.state.query}`
            );
        } else {
            apiUrl = apiUrl.concat(`${this.state.query}`);
        }

        axios
            .get(apiUrl)
            .then((res) => {
                this.props.dispatch(addTweets({ tweets: res.data.data }));
                this.props.dispatch(setMeta({ meta: res.data.meta }));
            })
            .catch((e) => console.log(e));
    };

    render() {
        return (
            <div>
                <h4>Recent Tweets Search</h4>
                <form onSubmit={this.onSubmitSearchQuery}>
                    <input
                        value={this.state.query}
                        placeholder='Search Query'
                        onChange={(e) =>
                            this.setState({ query: e.target.value })
                        }></input>{" "}
                    &nbsp;
                    <select
                        onChange={(e) => {
                            this.setState({
                                searchOption: e.target.value,
                            });
                        }}>
                        <option value='keyword'>Keyword</option>
                        <option value='from:'>Username</option>
                        <option value='phrase'>Search Exact Phrase</option>
                        <option value='%23'>Hashtag</option>
                    </select>
                    <button>Search</button>
                </form>
            </div>
        );
    }
}

export default connect()(RecentSearchForm);
