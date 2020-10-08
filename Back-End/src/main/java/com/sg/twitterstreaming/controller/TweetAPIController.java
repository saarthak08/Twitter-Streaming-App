package com.sg.twitterstreaming.controller;

import com.sg.twitterstreaming.config.DataToDataResponse;
import com.sg.twitterstreaming.model.DataResponse;
import com.sg.twitterstreaming.model.service.tweet.Data;
import com.sg.twitterstreaming.service.TweetAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.Objects;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tweets/")
public class TweetAPIController {

    private final TweetAPIService tweetApiService;
    private DataToDataResponse dataToDataResponse;

    @Autowired
    public TweetAPIController(TweetAPIService tweetApiService) {
        this.tweetApiService = tweetApiService;
    }

    @GetMapping(value = "/search")
    public ResponseEntity<?> recentSearchTweets(@RequestParam(name = "keyword") String keyword, @RequestParam(name = "next_token", required = false) String nextToken, @RequestParam(name = "start_time", required = false) String startTime) {
        ResponseEntity<?> responseEntity = tweetApiService.recentSearchTweetsByKeyword(keyword, nextToken, startTime);
        if (responseEntity.getStatusCodeValue() == 200) {
            dataToDataResponse = new DataToDataResponse((Data) Objects.requireNonNull(responseEntity.getBody()));
            return new ResponseEntity<DataResponse>(dataToDataResponse.getDataResponse(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
        }
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
    public ResponseEntity<?> getRealtimeStreamRules() {
        ResponseEntity<?> responseEntity = tweetApiService.getRealtimeStreamRules();
        return new ResponseEntity<>(responseEntity.getBody(), responseEntity.getStatusCode());
    }

    @PostMapping(value = "/live-stream/rules")
    public ResponseEntity<?> postRealtimeStreamRules(@RequestBody Map<String, Object> requestObject) {
        return tweetApiService.postRealtimeStreamRules(requestObject);
    }

}
