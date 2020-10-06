import React from "react";
import Tweet from './Tweet';
import {connect} from 'react-redux';

const TweetList = (props) => {
    return (
        <div>
            {props.tweets.map((tweet, index) => {
                return (
                    <Tweet tweet={tweet} key={index} index={index}></Tweet>
                )
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tweets:state.tweets
    };
}

export default connect(mapStateToProps)(TweetList);
