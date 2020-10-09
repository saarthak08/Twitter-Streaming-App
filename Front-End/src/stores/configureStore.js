import { createStore, combineReducers } from "redux";
import MetaReducer from "../reducers/MetaReducer";
import SearchParametersReducer from "../reducers/SearchParametersReducer";
import TweetsReducer from "../reducers/TweetsReducer";

export default () => {
    const store = createStore(
        combineReducers({
            tweets: TweetsReducer,
            meta:MetaReducer,
            searchParams:SearchParametersReducer,
        })
    );
    return store;
};
