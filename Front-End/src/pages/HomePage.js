import React, { useState, useEffect } from "react";
import SearchRecentTweetsForm from "../components/SearchRecentTweetsForm";
import TweetList from "../components/TweetList";

const HomePage = () => {
    const [error, setError] = useState(false);
    const [spinner, setSpinner]=useState(false);
    const [message, setMessage] = useState(false);


    useEffect(() => {
        setMessage(false);
    }, []);



    return (
        <div>
            <SearchRecentTweetsForm
                setSpinner={setSpinner}
                setError={setError}
                setMessage={setMessage}
            />
            <TweetList error={error} message={message} spinner={spinner}/>
        </div>
    );
};

export default HomePage;
