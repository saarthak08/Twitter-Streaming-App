const defaultTweetsState = {};


export default (state = defaultTweetsState, action) => {
    switch (action.type) {
        case "SET_META": {
            return {...state,...action.meta};
        }
        case "CLEAR_META": {
            return {};
        }
        default:
            return state;
    }
};