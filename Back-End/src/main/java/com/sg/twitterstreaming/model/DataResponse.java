package com.sg.twitterstreaming.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sg.twitterstreaming.model.service.tweet.*;
import lombok.Data;

import java.util.List;

@Data
public class DataResponse {

    private Meta meta;

    @JsonProperty("data")
    private List<TweetResponse> tweetResponse;
}
