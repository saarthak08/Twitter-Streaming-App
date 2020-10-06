import React from 'react';

const Tweet = (props) => {
    return (
        <div>
            <h4>{props.index+1}</h4>
            <p>{props.tweet.text}</p>
        </div>
    );
}

export default Tweet;