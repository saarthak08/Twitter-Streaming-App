package com.sg.twitterstreaming.model.Tweet;

import lombok.Data;

import java.io.Serializable;

@Data
public class Tweet implements Serializable {

    private Long id;

    private String text;
}
