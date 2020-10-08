import { createStore, combineReducers } from "redux";
import MetaReducer from "../reducers/MetaReducer";
import TweetsReducer from "../reducers/TweetsReducer";

export default () => {
    const store = createStore(
        combineReducers({
            tweets: TweetsReducer,
            meta:MetaReducer,
        })
    );
    return store;
};
