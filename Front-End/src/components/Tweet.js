import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Repeat, Favorite, ArrowForward, ArrowBack } from "@material-ui/icons";

const Tweet = (props) => {
    const [index, setIndex] = useState(0);
    

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

    const onImageClicked = (e, url) => {
        window.location.href = url;
    };

    const onClickButtonToTwitter = (e) => {
        window.location.href = `https://twitter.com/i/web/status/${props.tweet.id}`;
    };

    return (
        <div id='tweetDiv'>
            <Card>
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
                                    <Card.Img
                                        variant='top'
                                        src={props.tweet.media[index].url}
                                        height={250}
                                        style={{
                                            objectFit: "contain",
                                        }}
                                        onClick={(e) =>
                                            onImageClicked(
                                                e,
                                                props.tweet.media[index].url
                                            )
                                        }
                                    />
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
                            {props.tweet.media[0] &&
                                props.tweet.media[0].url && (
                                    <Card.Img
                                        variant='top'
                                        src={props.tweet.media[0].url}
                                        onClick={(e) =>
                                            onImageClicked(
                                                e,
                                                props.tweet.media[0].url
                                            )
                                        }
                                        height={250}
                                        style={{ objectFit: "contain" }}
                                    />
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
                        {moment(props.tweet.createdAt).format(
                            "DD MMM, YYYY, HH:MM A"
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
                    <Button
                        type='submit'
                        size='sm'
                        variant='outline-primary'
                        onClick={onClickButtonToTwitter}
                        id='buttonToTwitter'>
                        See on Twitter
                    </Button>
                    <Button
                        size='sm'
                        variant='outline-success'
                        type='submit'
                        id='buttonOffline'>
                        Save
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Tweet;
