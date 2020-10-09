const defaultSearchParametersState = {
    query:"",
    startTime:"",
};

export default (state=defaultSearchParametersState,action) => {
    switch(action.type) {
        case "SET_PARAMS": {
            return {
                query:action.query,
                startTime:action.startTime,
            }
        }
        case "CLEAR_PARAMS": {
            return defaultSearchParametersState;
        }
        default:
            return state;
    }
}