import React from "react";
import Tweet from "./Tweet";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

const TweetList = (props) => {
    return (
        <div className='pageBody' id='tweetListDiv'>
            {props.loading ? (
                <div id='spinnerDiv'> 
                <Spinner id='spinner' animation='border' variant='dark' />
                </div>
            ) : (
                props.tweets.map((tweet, index) => {
                    return (
                        <Tweet tweet={tweet} key={index} index={index}></Tweet>
                    );
                })
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets,
        loading: state.loading,
    };
};

export default connect(mapStateToProps)(TweetList);
