import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SavedTweetsPage from "../pages/SavedTweetsPage";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/saved" component={SavedTweetsPage} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default AppRouter;