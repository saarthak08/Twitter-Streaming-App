package com.sg.twitterstreaming.model.streamrule;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class StreamRule implements Serializable {

    private String id;

    private String value;

    public StreamRule() {

    }

}
