package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.io.Serializable;
import java.util.List;


@Data
public class Includes implements Serializable {

    @JsonProperty("users")
    private List<User> users;

    @JsonProperty("media")
    private List<Media> media;
}
