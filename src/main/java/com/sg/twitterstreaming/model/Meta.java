package com.sg.twitterstreaming.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Meta implements Serializable {

    @JsonProperty("newest_id")
    private Long newestId;

    @JsonProperty("oldest_id")
    private Long oldestId;

    @JsonProperty("result_count")
    private int resultCount;

    @JsonProperty("next_token")
    private String nextToken;
}
