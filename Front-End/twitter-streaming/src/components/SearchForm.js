import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addTweets, clearTweets } from "../actions/TweetsActions";
import { clearMeta, setMeta } from "../actions/MetaActions";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }

    onSubmitSearchQuery = (e) => {
        this.props.dispatch(clearTweets());
        this.props.dispatch(clearMeta());
        e.preventDefault();
        const apiUrl = `http://localhost:8080/api/tweets/search?keyword=${this.state.query}`;
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
                <form onSubmit={this.onSubmitSearchQuery}>
                    <input
                        value={this.state.query}
                        placeholder='search query'
                        onChange={(e) =>
                            this.setState({ query: e.target.value })
                        }></input>{" "}
                    &nbsp;
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default connect()(SearchForm);
