package com.sg.twitterstreaming.model.streamrule;

import lombok.Data;

import java.io.Serializable;

@Data
public class StreamRule implements Serializable {

    private String id;

    private String value;

}
