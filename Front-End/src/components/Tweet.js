import React, { useState, useEffect } from "react";
import moment from "moment";
import {
    addTweetToSavedTweets,
    deleteSavedTweet,
} from "../network/SavedTweetsNetworkRequest";
import { Card, OverlayTrigger, Tooltip, Button, Toast } from "react-bootstrap";
import { Repeat, Favorite, ArrowForward, ArrowBack } from "@material-ui/icons";

const Tweet = (props) => {
    const [index, setIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [show, setShow] = useState(false);
    const [afterSaveText, setAfterSaveText] = useState("");

    useEffect(() => {
        setIndex(0);
    }, []);

    const onForwardClicked = (e) => {
        e.preventDefault();
        setIndex(index + 1);
    };

    const onBackClicked = (e) => {
        e.preventDefault();
        setIndex(index - 1);
    };

    const onSaveButtonClicked = (e) => {
        setIsSaving(true);
        if (props.saved) {
            deleteSavedTweet(props.tweet.id)
                .then((res) => {
                    if (res.status === 200) {
                        setAfterSaveText("Deleted!");
                    } else {
                        setAfterSaveText("An error occurred!");
                    }
                    setIsSaving(false);
                    setShow(true);
                    props.updateTweets();
                })
                .catch((e) => {
                    setIsSaving(false);
                    setAfterSaveText("An error occurred!");
                    setShow(true);
                    props.updateTweets();
                });
        } else {
            addTweetToSavedTweets(props.tweet)
                .then((res) => {
                    if (res.status === 200) {
                        setAfterSaveText("Saved!");
                    } else if (res.status === 208) {
                        setAfterSaveText("Already Saved!");
                    } else {
                        setAfterSaveText("An error occurred!");
                    }
                    setIsSaving(false);
                    setShow(true);
                })
                .catch((e) => {
                    console.log(e);
                    setIsSaving(false);
                    setAfterSaveText("An error occurred!");
                    setShow(true);
                });
        }
    };

    return (
        <div id='tweetDiv'>
            <Card id='card'>
                <Card.Header id='cardHeader'>
                    <div id='cardHeaderText'>
                        {props.tweet.user.name} @{props.tweet.user.username}
                    </div>
                </Card.Header>
                {props.tweet.media ? (
                    props.tweet.media.length > 1 ? (
                        <div style={{ position: "relative" }}>
                            {index !== props.tweet.media.length - 1 && (
                                <ArrowForward
                                    className='arrowImageForward'
                                    onClick={onForwardClicked}
                                />
                            )}
                            {props.tweet.media[index] &&
                                props.tweet.media[index].url && (
                                    <a
                                        href={props.tweet.media[index].url}
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                        <Card.Img
                                            variant='top'
                                            src={props.tweet.media[index].url}
                                            height={250}
                                            style={{
                                                objectFit: "contain",
                                            }}
                                        />
                                    </a>
                                )}
                            {index !== 0 && (
                                <ArrowBack
                                    className='arrowImageBack'
                                    onClick={onBackClicked}
                                />
                            )}
                        </div>
                    ) : (
                        <div>
                            {props.tweet.media[0] && props.tweet.media[0].url && (
                                <a
                                    href={props.tweet.media[0].url}
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    <Card.Img
                                        variant='top'
                                        src={props.tweet.media[0].url}
                                        height={250}
                                        style={{ objectFit: "contain" }}
                                    />
                                </a>
                            )}
                        </div>
                    )
                ) : (
                    <div></div>
                )}
                <Card.Body id='tweetCardBody'>
                    <Card.Text id='tweetText'>{props.tweet.text}</Card.Text>
                    <Card.Subtitle
                        className='mb-2 text-muted'
                        id='tweetCardSubtitle'>
                        {moment(
                            props.tweet.createdAt,
                            "YYYY-MM-DDTHH:mm:ssZ"
                        ).fromNow()}{" "}
                        @{" "}
                        {moment(props.tweet.createdAt,"YYYY-MM-DDTHH:mm:ssZ").format(
                            "DD MMM, YYYY, hh:mm A"
                        )}
                    </Card.Subtitle>
                    <OverlayTrigger
                        placement='bottom'
                        overlay={<Tooltip>Retweets</Tooltip>}>
                        <Repeat id='repeatIcon' />
                    </OverlayTrigger>{" "}
                    {props.tweet.publicMetrics.retweet_count}
                    <OverlayTrigger
                        placement='bottom'
                        overlay={<Tooltip>Likes</Tooltip>}>
                        <Favorite id='favoriteIcon' />
                    </OverlayTrigger>{" "}
                    {props.tweet.publicMetrics.like_count}
                    <div id='buttonsDiv'>
                        <a
                            href={
                                "https://twitter.com/i/web/status/" +
                                props.tweet.id
                            }
                            target='_blank'
                            rel='noopener noreferrer'>
                            <Button
                                type='submit'
                                size='sm'
                                variant='outline-primary'
                                id='buttonToTwitter'>
                                See on Twitter
                            </Button>
                        </a>
                        <Button
                            onClick={onSaveButtonClicked}
                            size='sm'
                            variant={
                                props.saved
                                    ? "outline-danger"
                                    : "outline-success"
                            }
                            type='submit'
                            id='buttonOffline'>
                            {isSaving
                                ? `Loading...`
                                : props.saved
                                ? `Delete`
                                : `Save`}
                        </Button>
                    </div>
                    <Toast
                        id='toast'
                        onClose={() => setShow(false)}
                        show={show}
                        delay={3000}
                        autohide>
                        <Toast.Header>
                            <strong className='mr-auto'>{afterSaveText}</strong>
                        </Toast.Header>
                    </Toast>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Tweet;
