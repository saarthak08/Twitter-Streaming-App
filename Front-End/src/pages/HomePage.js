import React, { useState, useEffect } from "react";
import RecentSearchForm from "../components/RecentSearchForm";
import TweetList from "../components/TweetList";

const HomePage = () => {
    const [error, setError] = useState(false);
    const [spinner, setSpinner]=useState(false);
    const [message, setMessage] = useState(false);
    const [url,setURL]=useState('');


    useEffect(() => {
        setMessage(false);
        setURL('');
    }, []);



    return (
        <div>
            <RecentSearchForm
                setSpinner={setSpinner}
                setError={setError}
                setMessage={setMessage}
                setURL={setURL}
            />
            <TweetList error={error} message={message} spinner={spinner} url={url}/>
        </div>
    );
};

export default HomePage;
