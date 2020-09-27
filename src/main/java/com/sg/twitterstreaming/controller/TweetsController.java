package com.sg.twitterstreaming.controller;

import com.sg.twitterstreaming.model.Data;
import com.sg.twitterstreaming.service.APIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;


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
    public Object recentSearchTweets(@RequestParam(name = "keyword") String keyword, @RequestParam(name="next_token",required = false) String nextToken) {
        return apiService.recentSearchTweetsByKeyword(keyword,nextToken).getBody();
    }

    @GetMapping(value = "/stream", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
    public Flux<String> startTweetsStreaming() {
        return apiService.startTweetsStreaming();
    }
}
