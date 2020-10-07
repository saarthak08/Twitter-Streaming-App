
const defaultLoadingState=false;

export default (state=defaultLoadingState,action)=> {
    switch(action.type) {
        case 'SET_LOADING_TRUE':{
            return true;
        } 
        case 'SET_LOADING_FALSE': {
            return false;
        }
        default:
            return state;
    }
}