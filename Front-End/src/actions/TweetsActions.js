

export const addTweets = ({tweets=[]}={}) => ({
    type:'ADD_TWEETS',
    tweets
});


export const clearTweets = () => ({
    type:'CLEAR_TWEETS',
});
