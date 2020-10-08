package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

@Data
public class Tweet implements Serializable {

    @JsonProperty("id")
    private Long id;

    private String text;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("public_metrics")
    private PublicMetrics publicMetrics;

    @JsonProperty("author_id")
    private long authorId;

    private Attachments attachments;

    public Tweet() {

    }
}
