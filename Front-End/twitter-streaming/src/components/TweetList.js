import React from "react";
import Tweet from './Tweet';

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

export default TweetList;
