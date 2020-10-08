import React from "react";
import moment from 'moment';
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Repeat, Favorite } from "@material-ui/icons";

const Tweet = (props) => {
    return (
        <div id='tweetDiv'>
            <Card>
                <Card.Body id='tweetCardBody'>
                    <Card.Text>
                        {props.index + 1}) {props.tweet.text}
                    </Card.Text>
                    <Card.Subtitle
                        className='mb-2 text-muted'
                        id='tweetCardSubtitle'>
                        {moment(props.tweet.createdAt,'YYYY-MM-DDTHH:mm:ssZ').fromNow()}
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
