import React from "react";
import Tweet from "./Tweet";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

const TweetList = (props) => {
    return (
        <div className='pageBody' id='tweetListDiv'>
            {props.spinner ? (
                <div id='spinnerDiv'>
                    <Spinner id='spinner' animation='border' variant='dark' />
                </div>
            ) : props.error ? (
                <div className='helperTextDiv'>
                    <p className='helperText'>
                        Oops! An error occured. Please try again.
                    </p>
                </div>
            ) : !props.message ? (
                props.tweets.map((tweet, index) => {
                    return (
                        <Tweet tweet={tweet} key={index} index={index}></Tweet>
                    );
                })
            ) : (
                <div className='helperTextDiv'>
                    <p className='helperText'>No Tweets Found!</p>
                </div>
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
