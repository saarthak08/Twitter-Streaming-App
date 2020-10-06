package com.sg.twitterstreaming.model.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
public class PublicMetrics implements Serializable {

    @JsonProperty("retweet_count")
    private Long retweetCount;

    @JsonProperty("reply_count")
    private Long replyCount;

    @JsonProperty("quote_count")
    private Long quoteCount;

    @JsonProperty("like_count")
    private Long likeCount;
}
