package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sg.twitterstreaming.model.service.tweet.Includes;
import com.sg.twitterstreaming.model.service.tweet.Tweet;
import lombok.Data;

@Data
public class FluxResponse {
    @JsonProperty("data")
    private Tweet tweet;

    private Includes includes;
}
