import React from "react";
import SearchForm from "../components/SearchForm";
import TweetList from "../components/TweetList";

const HomePage = () => {
    return (
        <div>
            <SearchForm />
            <TweetList />
        </div>
    );
};

export default HomePage;
