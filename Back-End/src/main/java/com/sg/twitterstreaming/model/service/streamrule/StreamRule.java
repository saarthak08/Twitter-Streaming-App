package com.sg.twitterstreaming.model.service.streamrule;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class StreamRule implements Serializable {

    private String id;

    private String value;

    private String tag;

    public StreamRule() {

    }

}
