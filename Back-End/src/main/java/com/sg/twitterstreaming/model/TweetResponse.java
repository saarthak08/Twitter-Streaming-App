package com.sg.twitterstreaming.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sg.twitterstreaming.model.service.tweet.Attachments;
import com.sg.twitterstreaming.model.service.tweet.Media;
import com.sg.twitterstreaming.model.service.tweet.PublicMetrics;
import com.sg.twitterstreaming.model.service.tweet.User;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class TweetResponse {

    @Column(unique = true)
    @Id
    private String id;

    private String text;

    private String createdAt;


    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name = "public_metrics_id")
    private PublicMetrics publicMetrics;

    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    private List<Media> media;
}
