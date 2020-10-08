package com.sg.twitterstreaming.model.service.streamrule;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

@lombok.Data
public class Data implements Serializable {

    @JsonProperty("data")
    private List<StreamRule> ruleList;

    @JsonProperty("meta")
    private Meta meta;
}
