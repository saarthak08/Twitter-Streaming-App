import React from "react";
import { Spinner } from "react-bootstrap";
import Tweet from "../components/Tweet";
import { getAllSavedTweets } from "../network/SavedTweetsNetworkRequest";

class SavedTweetsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tweets: [],
            error: false,
            showHelperText: false,
        };
    }

    updateTweets = () => {
        getAllSavedTweets()
            .then((res) => {
                this.setState({ tweets: res.data.data, loading: false });
                if (this.state.tweets.length === 0) {
                    this.setState({ showHelperText: true });
                }
            })
            .catch((e) => {
                console.log(e);
                this.setState({ error: true, loading: false });
            });
    };

    componentDidMount() {
        this.updateTweets();
    }

    render() {
        return (
            <div className='pageBody'>
                <h3 className='pageTitle' id='title'>Saved Tweets</h3>
                {this.state.loading ? (
                    <div id='spinnerDiv'>
                        <Spinner
                            animation='border'
                            variant='dark'
                            id='spinner'></Spinner>
                    </div>
                ) : this.state.error ? (
                    <div className='helperTextDiv'>
                        <p className='helperText'>
                            Oops! An error occurred. Please try again.
                        </p>
                    </div>
                ) : this.state.showHelperText ? (
                    <div className='helperTextDiv'>
                        <p className='helperText'>No Saved Tweets Found! </p>
                    </div>
                ) : (
                    <div id='tweetListDiv'>
                        {this.state.tweets.map((tweet, index) => {
                            return (
                                <Tweet
                                    tweet={tweet}
                                    saved={true}
                                    key={index}
                                    updateTweets={this.updateTweets}></Tweet>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

export default SavedTweetsPage;
