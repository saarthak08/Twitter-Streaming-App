package com.sg.twitterstreaming.controller;

import com.sg.twitterstreaming.service.APIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:8000")
@RequestMapping("/api/tweets/")
public class TweetsController {

    private final APIService apiService;

    @Autowired
    public TweetsController(APIService apiService) {
        this.apiService = apiService;
    }

    @GetMapping(value = "/search")
    public Object recentSearchTweets(@RequestParam(name = "keyword") String keyword, @RequestParam(name = "next_token", required = false) String nextToken) {
        return apiService.recentSearchTweetsByKeyword(keyword, nextToken).getBody();
    }

    @GetMapping(value = "/sample-stream", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
    public Flux<String> startSampleTweetsStreaming() {
        return apiService.startSampleTweetsStreaming();
    }

    @GetMapping(value = "/live-stream", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
    public Flux<String> startTweetsStreaming() {
        return apiService.startRealtimeTweetsStreaming();
    }

    @GetMapping(value = "/live-stream/rules")
    public Object getRules() {
        return apiService.getRules().getBody();
    }

    @PostMapping(value = "/live-stream/rules")
    public Object postRules(@RequestBody Map<String, Object> requestObject) {
        return apiService.postRules(requestObject).getBody();
    }
}
