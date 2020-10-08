package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
public class PublicMetrics implements  Serializable {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty("retweet_count")
    private Long retweetCount;

    @JsonProperty("reply_count")
    private Long replyCount;

    @JsonProperty("quote_count")
    private Long quoteCount;

    @JsonProperty("like_count")
    private Long likeCount;
}
