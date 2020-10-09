import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
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
                            <Card.Img
                                variant='top'
                                src={props.tweet.media[index].url}
                                height={250}
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                            {index !== 0 && (
                                <ArrowBack
                                    className='arrowImageBack'
                                    onClick={onBackClicked}
                                />
                            )}
                        </div>
                    ) : (
                        <Card.Img
                            variant='top'
                            src={props.tweet.media[0].url}
                            height={250}
                            style={{ objectFit: "contain" }}
                        />
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
                        ).fromNow()}
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
                </Card.Body>
            </Card>
        </div>
    );
};

export default Tweet;
