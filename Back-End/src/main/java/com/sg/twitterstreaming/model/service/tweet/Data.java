package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

@lombok.Data
public class Data implements Serializable {

    @JsonProperty("data")
    private List<Tweet> tweetList;

    @JsonProperty("meta")
    private Meta meta;

    @JsonProperty("includes")
    private Includes includes;
}
