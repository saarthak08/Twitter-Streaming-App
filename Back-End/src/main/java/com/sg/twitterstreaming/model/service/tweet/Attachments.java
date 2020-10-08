package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Attachments implements Serializable {
    @JsonProperty("media_keys")
    private List<String> mediaArray;

}
