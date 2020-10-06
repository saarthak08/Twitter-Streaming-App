import React from "react";
import Header from "../components/Header";
import RecentSearchForm from "../components/RecentSearchForm";
import TweetList from "../components/TweetList";

const HomePage = () => {
    return (
        <div>
            <Header/>
            <RecentSearchForm />
            <TweetList />
        </div>
    );
};

export default HomePage;
