import React, { useState, useEffect } from "react";
import RecentSearchForm from "../components/SearchRecentTweetsForm";
import TweetList from "../components/TweetList";

const HomePage = () => {
    const [error, setError] = useState(false);
    const [spinner, setSpinner]=useState(false);
    const [message, setMessage] = useState(false);
    const [query,setQuery]=useState('');
    const [startTime,setStartTime]=useState('');


    useEffect(() => {
        setMessage(false);
        setQuery('');
        setStartTime('');
    }, []);



    return (
        <div>
            <RecentSearchForm
                setSpinner={setSpinner}
                setError={setError}
                setMessage={setMessage}
                setStartTime={setStartTime}
                setQuery={setQuery}
            />
            <TweetList error={error} message={message} spinner={spinner} query={query} startTime={startTime}/>
        </div>
    );
};

export default HomePage;
