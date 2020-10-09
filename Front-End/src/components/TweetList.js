import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import { searchRecentTweets } from "../network/SearchRecentTweetsNetworkRequest";
import { connect } from "react-redux";
import { addTweets } from "../actions/TweetsActions";
import { setMeta } from "../actions/MetaActions";
import { Spinner } from "react-bootstrap";

const TweetList = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [prevToken,setPrevToken]=useState('');

    useEffect(() => {
        const handleScroll = async () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight
            ) {
                return;
            } else {
                if (props.query !== ""&&!isFetching&&prevToken!==props.meta.next_token&&!isFetching) {
                    setPrevToken(props.meta.next_token);
                    setIsFetching(true);
                    await searchRecentTweets({
                        nextToken: props.meta.next_token,
                        query: props.query,
                        startTime: props.startTime,
                    })
                        .then((res) => {
                            props.dispatch(
                                addTweets({ tweets: res.data.data })
                            );
                            props.dispatch(setMeta({ meta: res.data.meta }));
                            setIsFetching(false);
                        })
                        .catch((e) => {
                            setIsFetching(false);
                        });
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [props,isFetching,prevToken]);

    return (
        <div className='pageBody' id='tweetListDiv'>
            {props.spinner ? (
                <div id='spinnerDiv'>
                    <Spinner id='spinner' animation='border' variant='dark' />
                </div>
            ) : props.error ? (
                <div className='helperTextDiv'>
                    <p className='helperText'>
                        Oops! An error occured. Please try again.
                    </p>
                </div>
            ) : !props.message ? (
                <div>
                    {props.tweets.map((tweet, index) => {
                        return (
                            <Tweet
                                tweet={tweet}
                                key={index}
                                index={index}></Tweet>
                        );
                    })}
                    {isFetching && (
                        <div id='fetchingSpinnerDiv'>
                            <Spinner animation='grow' variant='dark'></Spinner>
                        </div>
                    )}
                </div>
            ) : (
                <div className='helperTextDiv'>
                    <p className='helperText'>No Tweets Found!</p>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets,
        loading: state.loading,
        meta: state.meta,
    };
};

export default connect(mapStateToProps)(TweetList);
