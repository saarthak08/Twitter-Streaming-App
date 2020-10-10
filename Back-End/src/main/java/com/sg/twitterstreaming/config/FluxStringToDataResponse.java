package com.sg.twitterstreaming.config;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sg.twitterstreaming.model.DataResponse;
import com.sg.twitterstreaming.model.service.tweet.Data;
import com.sg.twitterstreaming.model.service.tweet.FluxResponse;

import java.util.ArrayList;

public class FluxStringToDataResponse {
    private DataToDataResponse dataToDataResponse;

    public FluxStringToDataResponse(String json) {
        Data data = new Data();
        data.setTweetList(new ArrayList<>());
        dataToDataResponse = new DataToDataResponse(data);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, false);
        try {
            FluxResponse response = objectMapper.readValue(json, FluxResponse.class);
            data.setIncludes(response.getIncludes());
            data.getTweetList().add(response.getTweet());
        } catch (JsonProcessingException jsonProcessingException) {
            jsonProcessingException.printStackTrace();
        }
        dataToDataResponse = new DataToDataResponse(data);
    }

    public DataResponse getDataResponse() {
        return dataToDataResponse.getDataResponse();
    }
}
