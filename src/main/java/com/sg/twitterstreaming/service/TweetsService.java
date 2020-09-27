package com.sg.twitterstreaming.service;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.Map;

@Service
public interface TweetsService {

    Object recentSearchTweetsByKeyword(String keyword,String nextToken);

    Flux<String> startRealtimeTweetsStreaming();

    Flux<String> startSampleTweetsStreaming();

    ResponseEntity<?> getRules();

    ResponseEntity<Object> postRules(Map<String,Object> requestObject);

}
