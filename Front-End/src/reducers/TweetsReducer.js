const defaultTweetsState = [];

export default (state = defaultTweetsState, action) => {
    switch (action.type) {
        case "ADD_TWEETS": {
            return [...state, ...action.tweets];
        }
        case "CLEAR_TWEETS": {
            return [];
        }
        default:
            return state;
    }
};
