import React from "react";

const Tweet = (props) => {
    return (
        <div>
            <h4>{props.index + 1}</h4>
            <p>{props.tweet.text}</p>
            <p>Time: {props.tweet.created_at}</p>
            <p>Retweets: {props.tweet.public_metrics.retweet_count}</p>
            <p>Likes: {props.tweet.public_metrics.like_count}</p>
        </div>
    );
};

export default Tweet;
