package com.sg.twitterstreaming.controller;

import com.sg.twitterstreaming.repository.TweetRepository;
import com.sg.twitterstreaming.service.TweetAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:8000")
@RequestMapping("/api/tweets/")
public class TweetAPIController {

    private final TweetAPIService tweetApiService;

    @Autowired
    public TweetAPIController(TweetAPIService tweetApiService) {
        this.tweetApiService = tweetApiService;
    }

    @GetMapping(value = "/search")
    public Object recentSearchTweets(@RequestParam(name = "keyword") String keyword, @RequestParam(name = "next_token", required = false) String nextToken) {
        return ((ResponseEntity<?>)(tweetApiService.recentSearchTweetsByKeyword(keyword,nextToken))).getBody();
    }

    @GetMapping(value = "/sample-stream", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
    public Flux<String> startSampleTweetsStreaming() {
        return tweetApiService.startSampleTweetsStreaming();
    }

    @GetMapping(value = "/live-stream", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
    public Flux<String> startRealtimeTweetsStreaming() {
        return tweetApiService.startRealtimeTweetsStreaming();
    }

    @GetMapping(value = "/live-stream/rules")
    public Object getRealtimeStreamRules() {
        return tweetApiService.getRealtimeStreamRules().getBody();
    }

    @PostMapping(value = "/live-stream/rules")
    public Object postRealtimeStreamRules(@RequestBody Map<String, Object> requestObject) {
        return tweetApiService.postRealtimeStreamRules(requestObject).getBody();
    }

}