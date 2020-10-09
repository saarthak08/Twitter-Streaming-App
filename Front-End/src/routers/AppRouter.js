import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SavedTweetsPage from "../pages/SavedTweetsPage";
import StreamingPage from "../pages/StreamingPage";
import Footer from '../components/Footer';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={HomePage} exact={true} />
                <Route path='/saved' component={SavedTweetsPage} />
                <Route path='/stream' component={StreamingPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default AppRouter;
